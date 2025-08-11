//go:build mage

package main

import (
    "fmt"
    "os"
    "path/filepath"
    "runtime"
    "strings"

    "github.com/magefile/mage/mg"
    "github.com/magefile/mage/sh"
)

const (
    packageName = "github.com/dunamismax/forge-realm"
    buildDir    = "public"
    tmpDir      = "tmp"
    resourceDir = "resources"
)

// Default target to run when none is specified
var Default = Build

// Build builds the Hugo site for production
func Build() error {
    mg.SerialDeps(Clean, buildSite)
    return nil
}

func buildSite() error {
    fmt.Println("Building Hugo site...")

    // Ensure hugo modules are tidy
    if err := sh.RunV("hugo", "mod", "tidy"); err != nil {
        return fmt.Errorf("failed to tidy hugo modules: %w", err)
    }

    // Build with minification for production
    return sh.RunV("hugo", "--minify", "--environment", "production")
}

// Dev starts the Hugo development server
func Dev() error {
    fmt.Println("Starting Hugo development server...")
    return sh.RunV("hugo", "server", "--buildDrafts", "--bind", "0.0.0.0")
}

// DevFast starts the Hugo development server with fast render
func DevFast() error {
    fmt.Println("Starting Hugo development server with fast render...")
    return sh.RunV("hugo", "server", "--buildDrafts", "--bind", "0.0.0.0", "--disableFastRender=false")
}

// Preview builds the site with drafts for preview/staging
func Preview() error {
    fmt.Println("Building Hugo site for preview...")
    
    if err := sh.RunV("hugo", "mod", "tidy"); err != nil {
        return fmt.Errorf("failed to tidy hugo modules: %w", err)
    }

    return sh.RunV("hugo", "--buildDrafts", "--environment", "staging")
}

// Serve starts a production server locally
func Serve() error {
    fmt.Println("Starting Hugo production server...")
    return sh.RunV("hugo", "server", "--environment", "production", "--disableFastRender")
}

// Clean removes built files and caches
func Clean() error {
    fmt.Println("Cleaning Hugo build artifacts...")

    dirsToClean := []string{buildDir, resourceDir, tmpDir}
    
    for _, dir := range dirsToClean {
        if err := sh.Rm(dir); err != nil && !os.IsNotExist(err) {
            return fmt.Errorf("failed to remove %s: %w", dir, err)
        }
    }

    fmt.Println("Clean complete!")
    return nil
}

// ModTidy tidies Hugo modules
func ModTidy() error {
    fmt.Println("Tidying Hugo modules...")
    return sh.RunV("hugo", "mod", "tidy")
}

// ModUpdate updates Hugo modules
func ModUpdate() error {
    fmt.Println("Updating Hugo modules...")
    if err := sh.RunV("hugo", "mod", "get", "-u"); err != nil {
        return fmt.Errorf("failed to update modules: %w", err)
    }
    return sh.RunV("hugo", "mod", "tidy")
}

// ModClean cleans Hugo module cache
func ModClean() error {
    fmt.Println("Cleaning Hugo module cache...")
    return sh.RunV("hugo", "mod", "clean", "--all")
}

// Validate validates the built site
func Validate() error {
    fmt.Println("Validating site build...")
    mg.SerialDeps(Build)
    
    // Check if public directory exists and has content
    if _, err := os.Stat(buildDir); os.IsNotExist(err) {
        return fmt.Errorf("build directory %s does not exist", buildDir)
    }
    
    // Check for index.html
    indexPath := filepath.Join(buildDir, "index.html")
    if _, err := os.Stat(indexPath); os.IsNotExist(err) {
        return fmt.Errorf("index.html not found in build directory")
    }
    
    fmt.Println("Site validation passed!")
    return nil
}

// Check runs Hugo's built-in checks
func Check() error {
    fmt.Println("Running Hugo checks...")
    
    // Check config
    fmt.Println("  Checking configuration...")
    if err := sh.RunV("hugo", "config"); err != nil {
        return fmt.Errorf("hugo config check failed: %w", err)
    }
    
    // Check for broken links (if hugo supports it in this version)
    fmt.Println("  Checking for issues...")
    if err := sh.RunV("hugo", "--printPathWarnings"); err != nil {
        fmt.Printf("Warning: hugo path warnings check failed: %v\n", err)
    }
    
    return nil
}

// Install ensures Hugo and dependencies are available
func Install() error {
    fmt.Println("Checking Hugo installation...")
    
    // Check if Hugo is installed
    if err := sh.Run("which", "hugo"); err != nil {
        return fmt.Errorf("hugo is not installed. Please install Hugo extended version")
    }
    
    // Check Hugo version
    version, err := sh.Output("hugo", "version")
    if err != nil {
        return fmt.Errorf("failed to get hugo version: %w", err)
    }
    
    fmt.Printf("Hugo version: %s\n", version)
    
    // Check if it's extended version
    if !strings.Contains(strings.ToLower(version), "extended") {
        return fmt.Errorf("hugo extended version is required")
    }
    
    // Install npm dependencies if package.json exists
    if _, err := os.Stat("package.json"); err == nil {
        fmt.Println("Installing npm dependencies...")
        if err := sh.RunV("npm", "install"); err != nil {
            return fmt.Errorf("failed to install npm dependencies: %w", err)
        }
    }
    
    // Tidy modules
    return ModTidy()
}

// CI runs the complete CI pipeline for Cloudflare Pages
func CI() error {
    fmt.Println("Running CI pipeline for Cloudflare Pages...")
    mg.SerialDeps(Install, Validate, showBuildInfo)
    return nil
}

// Reset completely resets the repository to a clean state
func Reset() error {
    fmt.Println("Resetting repository to clean state...")
    
    mg.SerialDeps(Clean, ModClean)
    
    fmt.Println("Reset complete!")
    return nil
}

// showBuildInfo displays information about the built site
func showBuildInfo() error {
    if _, err := os.Stat(buildDir); os.IsNotExist(err) {
        return fmt.Errorf("build directory %s does not exist", buildDir)
    }

    fmt.Println("\nBuild Information:")
    
    // Show build directory size
    if err := sh.RunV("du", "-sh", buildDir); err == nil {
        // du command succeeded
    } else {
        fmt.Printf("   Build directory: %s\n", buildDir)
    }
    
    // Count files in build directory
    if files, err := filepath.Glob(filepath.Join(buildDir, "**")); err == nil {
        fmt.Printf("   Generated files: %d\n", len(files))
    }
    
    // Show Hugo version
    if version, err := sh.Output("hugo", "version"); err == nil {
        fmt.Printf("   Hugo version: %s\n", version)
    }
    
    return nil
}

// Help prints a help message with available commands
func Help() {
    fmt.Println(`
Forge Realm Hugo Site Magefile

Available commands:

Development:
  mage install (i)      Check Hugo installation and install dependencies
  mage dev (d)          Start development server with drafts
  mage devFast          Start development server with fast render enabled
  mage serve (s)        Start production server locally

Building:
  mage build (b)        Build production site
  mage preview (p)      Build site with drafts for staging
  mage validate (v)     Build and validate site

Maintenance:
  mage clean (c)        Clean build artifacts and caches
  mage modTidy (mt)     Tidy Hugo modules
  mage modUpdate (mu)   Update Hugo modules
  mage modClean (mc)    Clean Hugo module cache
  mage check            Run Hugo configuration checks
  mage reset (r)        Reset to clean state (clean + mod clean)

Production:
  mage ci               Complete CI pipeline for Cloudflare Pages
  
Other:
  mage help (h)         Show this help message
    `)
}

// Aliases for common commands
var Aliases = map[string]interface{}{
    "b":  Build,
    "d":  Dev,
    "s":  Serve,
    "c":  Clean,
    "p":  Preview,
    "v":  Validate,
    "i":  Install,
    "r":  Reset,
    "mt": ModTidy,
    "mu": ModUpdate,
    "mc": ModClean,
    "h":  Help,
}