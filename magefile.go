//go:build mage

package main

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"time"

	"github.com/magefile/mage/mg"
	"github.com/magefile/mage/sh"
)

const (
	packageName = "github.com/dunamismax/forge-realm"
	binaryName  = "forge-realm"
	buildDir    = "build"
	tmpDir      = "tmp"
)

// Default target to run when none is specified
var Default = Build

// loadEnvFile loads environment variables from .env file if it exists
func loadEnvFile() error {
	envFile := ".env"
	if _, err := os.Stat(envFile); os.IsNotExist(err) {
		return nil
	}

	file, err := os.Open(envFile)
	if err != nil {
		return fmt.Errorf("failed to open .env file: %w", err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}

		parts := strings.SplitN(line, "=", 2)
		if len(parts) == 2 {
			key := strings.TrimSpace(parts[0])
			value := strings.TrimSpace(parts[1])

			if (strings.HasPrefix(value, `"`) && strings.HasSuffix(value, `"`)) ||
				(strings.HasPrefix(value, `'`) && strings.HasSuffix(value, `'`)) {
				value = value[1 : len(value)-1]
			}

			if os.Getenv(key) == "" {
				os.Setenv(key, value)
			}
		}
	}

	return scanner.Err()
}

// Build generates code and builds the Forge Realm binary
func Build() error {
	mg.SerialDeps(Generate, buildServer)
	return nil
}

func buildServer() error {
	fmt.Println("Building Forge Realm...")

	if err := sh.Run("mkdir", "-p", buildDir); err != nil {
		return fmt.Errorf("failed to create build directory: %w", err)
	}

	version := "dev"
	if tag := os.Getenv("GIT_TAG"); tag != "" {
		version = tag
	}

	ldflags := fmt.Sprintf("-s -w -X main.version=%s -X main.buildTime=%s -X main.commit=%s",
		version, getCurrentTime(), getGitCommit())
	binaryPath := filepath.Join(buildDir, binaryName)

	if runtime.GOOS == "windows" {
		binaryPath += ".exe"
	}

	return sh.RunV("go", "build", "-ldflags="+ldflags, "-o", binaryPath, ".")
}

func getCurrentTime() string {
	return time.Now().UTC().Format("2006-01-02T15:04:05Z")
}

func getGitCommit() string {
	commit, err := sh.Output("git", "rev-parse", "--short", "HEAD")
	if err != nil {
		return "unknown"
	}
	return commit
}

// getGoBinaryPath finds the path to a Go binary
func getGoBinaryPath(binaryName string) (string, error) {
	if err := sh.Run("which", binaryName); err == nil {
		return binaryName, nil
	}

	if gobin := os.Getenv("GOBIN"); gobin != "" {
		binaryPath := filepath.Join(gobin, binaryName)
		if _, err := os.Stat(binaryPath); err == nil {
			return binaryPath, nil
		}
	}

	gopath := os.Getenv("GOPATH")
	if gopath == "" {
		if home := os.Getenv("HOME"); home != "" {
			gopath = filepath.Join(home, "go")
		}
	}

	if gopath != "" {
		binaryPath := filepath.Join(gopath, "bin", binaryName)
		if _, err := os.Stat(binaryPath); err == nil {
			return binaryPath, nil
		}
	}

	return "", fmt.Errorf("%s not found in PATH, GOBIN, or GOPATH/bin", binaryName)
}

// Generate runs all code generation tasks
func Generate() error {
	fmt.Println("Generating code...")
	
	if err := sh.RunV("go", "generate", "./..."); err != nil {
		return fmt.Errorf("failed to run go generate: %w", err)
	}

	return nil
}

// Fmt formats and tidies code using goimports and standard tooling
func Fmt() error {
	fmt.Println("Formatting and tidying...")

	if err := sh.RunV("go", "mod", "tidy"); err != nil {
		return fmt.Errorf("failed to tidy modules: %w", err)
	}

	fmt.Println("  Running goimports...")
	goimportsPath, err := getGoBinaryPath("goimports")
	if err != nil {
		fmt.Printf("Warning: goimports not found, falling back to go fmt: %v\n", err)
		if err := sh.RunV("go", "fmt", "./..."); err != nil {
			return fmt.Errorf("failed to format code: %w", err)
		}
	} else {
		if err := sh.RunV(goimportsPath, "-w", "."); err != nil {
			fmt.Printf("Warning: goimports failed, falling back to go fmt: %v\n", err)
			if err := sh.RunV("go", "fmt", "./..."); err != nil {
				return fmt.Errorf("failed to format code: %w", err)
			}
		}
	}

	return nil
}

// Vet analyzes code for common errors
func Vet() error {
	fmt.Println("Running go vet...")
	return sh.RunV("go", "vet", "./...")
}

// VulnCheck scans for known vulnerabilities
func VulnCheck() error {
	fmt.Println("Running vulnerability check...")
	govulncheckPath, err := getGoBinaryPath("govulncheck")
	if err != nil {
		fmt.Printf("Warning: govulncheck not found: %v\n", err)
		fmt.Println("Install with: go install golang.org/x/vuln/cmd/govulncheck@latest")
		return nil
	}
	return sh.RunV(govulncheckPath, "./...")
}

// Lint runs golangci-lint with comprehensive linting rules
func Lint() error {
	fmt.Println("Running golangci-lint...")

	lintPath, err := getGoBinaryPath("golangci-lint")
	if err != nil {
		fmt.Printf("Warning: golangci-lint not found: %v\n", err)
		fmt.Println("Install with: go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest")
		return nil
	}

	return sh.RunV(lintPath, "run", "./...")
}

// Test runs all tests
func Test() error {
	fmt.Println("Running tests...")
	return sh.RunV("go", "test", "./...")
}

// TestCoverage runs tests with coverage reporting
func TestCoverage() error {
	fmt.Println("Running tests with coverage...")
	if err := sh.RunV("go", "test", "-coverprofile=coverage.out", "./..."); err != nil {
		return err
	}
	
	fmt.Println("Generating coverage report...")
	return sh.RunV("go", "tool", "cover", "-html=coverage.out", "-o=coverage.html")
}

// Bench runs benchmarks
func Bench() error {
	fmt.Println("Running benchmarks...")
	return sh.RunV("go", "test", "-bench=.", "-benchmem", "./...")
}

// Run builds and runs the server
func Run() error {
	mg.SerialDeps(Build)
	fmt.Println("Starting Forge Realm server...")

	binaryPath := filepath.Join(buildDir, binaryName)
	if runtime.GOOS == "windows" {
		binaryPath += ".exe"
	}

	return sh.RunV(binaryPath)
}

// Dev starts development server with hot reload
func Dev() error {
	fmt.Println("Starting development server with hot reload...")

	airPath, err := getGoBinaryPath("air")
	if err != nil {
		fmt.Println("Installing air...")
		if err := sh.RunV("go", "install", "github.com/air-verse/air@latest"); err != nil {
			return fmt.Errorf("failed to install air: %w", err)
		}
		airPath, err = getGoBinaryPath("air")
		if err != nil {
			return fmt.Errorf("air not found after installation: %w", err)
		}
	}

	return sh.RunV(airPath)
}

// Clean removes built binaries and generated files
func Clean() error {
	fmt.Println("Cleaning up...")

	if err := sh.Rm(buildDir); err != nil && !os.IsNotExist(err) {
		return fmt.Errorf("failed to remove build directory: %w", err)
	}

	if err := sh.Rm(tmpDir); err != nil && !os.IsNotExist(err) {
		return fmt.Errorf("failed to remove tmp directory: %w", err)
	}

	if err := sh.Rm("coverage.out"); err != nil && !os.IsNotExist(err) {
		fmt.Printf("Warning: failed to remove coverage.out: %v\n", err)
	}

	if err := sh.Rm("coverage.html"); err != nil && !os.IsNotExist(err) {
		fmt.Printf("Warning: failed to remove coverage.html: %v\n", err)
	}

	fmt.Println("Clean complete!")
	return nil
}

// Reset completely resets the repository to a fresh state
func Reset() error {
	fmt.Println("Resetting repository to clean state...")

	if err := Clean(); err != nil {
		return fmt.Errorf("failed to clean build artifacts: %w", err)
	}

	fmt.Println("Regenerating code...")
	if err := Generate(); err != nil {
		return fmt.Errorf("failed to regenerate code: %w", err)
	}

	fmt.Println("Reset complete! Repository is now in fresh state.")
	fmt.Println("You can now run 'mage dev' or 'mage run' to start the server.")
	return nil
}

// Setup installs required development tools
func Setup() error {
	fmt.Println("Setting up Forge Realm development environment...")

	tools := map[string]string{
		"govulncheck": "golang.org/x/vuln/cmd/govulncheck@latest",
		"air":         "github.com/air-verse/air@latest",
		"goimports":   "golang.org/x/tools/cmd/goimports@latest",
		"golangci-lint": "github.com/golangci/golangci-lint/cmd/golangci-lint@latest",
	}

	for tool, pkg := range tools {
		fmt.Printf("  Installing %s...\n", tool)
		if err := sh.RunV("go", "install", pkg); err != nil {
			return fmt.Errorf("failed to install %s: %w", tool, err)
		}
	}

	fmt.Println("Downloading dependencies...")
	if err := sh.RunV("go", "mod", "download"); err != nil {
		return fmt.Errorf("failed to download dependencies: %w", err)
	}

	fmt.Println("Setup complete!")
	fmt.Println("Next steps:")
	fmt.Println("   • Run 'mage dev' to start development with hot reload")
	fmt.Println("   • Run 'mage build' to create production binary")
	fmt.Println("   • Run 'mage help' to see all available commands")

	return nil
}

// Cards generates card sheets and prints
func Cards() error {
	fmt.Println("Generating card sheets and print files...")
	
	if err := loadEnvFile(); err != nil {
		return fmt.Errorf("failed to load .env file: %w", err)
	}

	// TODO: Implement card generation logic
	fmt.Println("Card generation not yet implemented - this will generate:")
	fmt.Println("  • PDF print sheets")
	fmt.Println("  • Individual card images")
	fmt.Println("  • Digital exports for simulators")

	return nil
}

// Validate generates card validation reports
func Validate() error {
	fmt.Println("Validating card data and rules...")
	
	// TODO: Implement card validation logic
	fmt.Println("Card validation not yet implemented - this will validate:")
	fmt.Println("  • Card JSON schema compliance")
	fmt.Println("  • Rule text consistency")
	fmt.Println("  • Set balance metrics")

	return nil
}

// CI runs the complete CI pipeline
func CI() error {
	fmt.Println("Running complete CI pipeline...")
	
	fmt.Println("Phase 1: Code Quality")
	mg.SerialDeps(Generate, Fmt, Vet)
	
	fmt.Println("Phase 2: Security and Linting")
	mg.Deps(VulnCheck, Lint)
	
	fmt.Println("Phase 3: Testing")
	mg.SerialDeps(Test, TestCoverage)
	
	fmt.Println("Phase 4: Build")
	mg.SerialDeps(Build, showBuildInfo)
	
	fmt.Println("Phase 5: Game Content Validation")
	mg.Deps(Validate)

	fmt.Println("\n🎉 CI Pipeline completed successfully!")
	return nil
}

// Quality runs all quality checks
func Quality() error {
	fmt.Println("Running all quality checks...")
	mg.Deps(Vet, Lint, VulnCheck)
	return nil
}

// Help prints a help message with available commands
func Help() {
	fmt.Println(`
Forge Realm Magefile - Open Source Trading Card Game

Available commands:

Development:
  mage setup (s)        Install all development tools and dependencies
  mage generate (g)     Run code generation
  mage dev (d)          Start development server with hot reload
  mage run (r)          Build and run server
  mage build (b)        Build production binary

Code Quality:
  mage fmt (f)          Format code with goimports and tidy modules
  mage vet (v)          Run go vet static analysis
  mage lint (l)         Run golangci-lint comprehensive linting
  mage vulncheck (vc)   Check for security vulnerabilities
  mage quality (q)      Run all quality checks (vet + lint + vulncheck)

Testing:
  mage test (t)         Run all tests
  mage coverage (cov)   Run tests with coverage report
  mage bench            Run benchmarks

Game Content:
  mage cards            Generate card sheets and print files
  mage validate (val)   Validate card data and rules

Production:
  mage ci               Complete CI pipeline (quality + test + build + validate)
  mage clean (c)        Clean build artifacts and temporary files
  mage reset            Reset repository to fresh state

Other:
  mage help (h)         Show this help message
    `)
}

// showBuildInfo displays information about the built binary
func showBuildInfo() error {
	binaryPath := filepath.Join(buildDir, binaryName)
	if runtime.GOOS == "windows" {
		binaryPath += ".exe"
	}

	if _, err := os.Stat(binaryPath); os.IsNotExist(err) {
		return fmt.Errorf("binary not found: %s", binaryPath)
	}

	fmt.Println("\n🏗️  Build Information:")

	if info, err := os.Stat(binaryPath); err == nil {
		size := info.Size()
		fmt.Printf("   Binary size: %.2f MB\n", float64(size)/1024/1024)
	}

	if version, err := sh.Output("go", "version"); err == nil {
		fmt.Printf("   Go version: %s\n", version)
	}

	if commit := getGitCommit(); commit != "unknown" {
		fmt.Printf("   Git commit: %s\n", commit)
	}

	fmt.Printf("   Build time: %s\n", getCurrentTime())
	fmt.Printf("   Binary path: %s\n", binaryPath)

	return nil
}

// Aliases for common commands
var Aliases = map[string]interface{}{
	"b":   Build,
	"g":   Generate,
	"f":   Fmt,
	"v":   Vet,
	"l":   Lint,
	"vc":  VulnCheck,
	"r":   Run,
	"d":   Dev,
	"c":   Clean,
	"s":   Setup,
	"q":   Quality,
	"t":   Test,
	"cov": TestCoverage,
	"val": Validate,
	"h":   Help,
}