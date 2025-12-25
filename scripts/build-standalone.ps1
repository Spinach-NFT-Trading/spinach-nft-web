# Build standalone deployment folder
# This script does everything needed for making a standalone artifact

$ErrorActionPreference = "Stop"

Write-Host -ForegroundColor Cyan "Preparing standalone deployment..."

# Get the current project directory name (e.g. spinach-nft-ui)
$projectName = Split-Path -Path $PWD -Leaf
Write-Host -ForegroundColor Cyan "Detected project name: $projectName"

# Define the base destination for project-specific assets
# In a monorepo, Next.js output is at .next/standalone/<project-name>
$standaloneBase = ".next/standalone"
$projectTargetBase = "$standaloneBase/$projectName"

# --- Copy files to Root of Standalone
# These are files that should sit at the root of the deployment artifact
$filesToRoot = @(
    # Production hosting config
    "pm2.yml"
)

foreach ($sourcePath in $filesToRoot) {
    Write-Host -ForegroundColor Cyan "Copying file $sourcePath to root..."
    $destinationPath = "$standaloneBase/$sourcePath"
    
    if (Test-Path -Path $sourcePath) {
        Copy-Item -Path $sourcePath -Destination $destinationPath -Force
    } else {
        Write-Host -ForegroundColor Yellow "Warning: $sourcePath does not exist, skipping..."
    }
}

# --- Copy Workspace Root files
# Files from the monorepo root
$rootFilesToCopy = @(
    ".yarnrc.yml"
)

foreach ($fileName in $rootFilesToCopy) {
    $sourcePath = "../../$fileName"
    Write-Host -ForegroundColor Cyan "Copying formatted file $sourcePath to root..."
    $destinationPath = "$standaloneBase/$fileName"
    
    if (Test-Path -Path $sourcePath) {
        Copy-Item -Path $sourcePath -Destination $destinationPath -Force
    } else {
        Write-Host -ForegroundColor Yellow "Warning: $sourcePath does not exist, skipping..."
    }
}

# --- Copy Project Specific Folders
# These need to go into the project subfolder in standalone
$foldersToProject = @(
    # Public assets
    "public",
    # Messages for i18n
    "messages",
    # Source folder
    "src"
)

foreach ($sourcePath in $foldersToProject) {
    Write-Host -ForegroundColor Cyan "Copying folder $sourcePath to $projectName..."

    $destinationPath = "$projectTargetBase"

    if (Test-Path -Path $sourcePath) {
        Copy-Item -Path $sourcePath -Destination $destinationPath -Recurse -Force
    } else {
        Write-Host -ForegroundColor Yellow "Warning: $sourcePath does not exist, skipping..."
    }
}

# --- Copy .next/static
# This is a special case as it needs to go to .next/static inside the project folder
$staticSource = ".next/static"
$staticParentDest = "$projectTargetBase/.next"

Write-Host -ForegroundColor Cyan "Copying folder $staticSource to $projectName..."

if (Test-Path -Path $staticSource) {
    if (-not (Test-Path -Path $staticParentDest)) {
        New-Item -ItemType Directory -Path $staticParentDest -Force | Out-Null
    }
    Copy-Item -Path $staticSource -Destination $staticParentDest -Recurse -Force
} else {
    Write-Host -ForegroundColor Yellow "Warning: $staticSource does not exist, skipping..."
}


# --- Remove postinstall script from package.json
# `postinstall` is removed because the standalone build doesn't really need to build the lib anymore.
# `postinstall` triggers the build of the libs, causing errors.
Write-Host -ForegroundColor Cyan "Removing postinstall script from package.json..."
$packageJsonPath = "$standaloneBase/package.json"
if (Test-Path -Path $packageJsonPath) {
    $json = Get-Content -Path $packageJsonPath -Raw | ConvertFrom-Json
    if ($json.scripts -and $json.scripts.postinstall) {
        $json.scripts.PSObject.Properties.Remove('postinstall')
        $json | ConvertTo-Json -Depth 10 | Set-Content -Path $packageJsonPath
        Write-Host "postinstall script removed."
    }
} else {
    Write-Host -ForegroundColor Yellow "Warning: $packageJsonPath not found."
}

# --- Copy Scripts folder to root of Standalone
# This copies scripts from monorepo root to standalone root
$scriptsSource = "../scripts"
$scriptsFiles = @(
    "discord-webhook.js"
)

$scriptsTargetDir = "$standaloneBase/scripts"
if (-not (Test-Path -Path $scriptsTargetDir)) {
    New-Item -ItemType Directory -Path $scriptsTargetDir -Force | Out-Null
}

foreach ($scriptFile in $scriptsFiles) {
    $sourcePath = "$scriptsSource/$scriptFile"
    Write-Host -ForegroundColor Cyan "Copying script $sourcePath to scripts/..."
    
    if (Test-Path -Path $sourcePath) {
        Copy-Item -Path $sourcePath -Destination "$scriptsTargetDir/$scriptFile" -Force
        
        # Also copy to the project root scripts (for internal calls, e.g. yarn g:devops)
        $projectScriptsDir = "$projectTargetBase/scripts"
        if (-not (Test-Path -Path $projectScriptsDir)) {
            New-Item -ItemType Directory -Path $projectScriptsDir -Force | Out-Null
        }
        Copy-Item -Path $sourcePath -Destination "$projectScriptsDir/$scriptFile" -Force
    } else {
        Write-Host -ForegroundColor Yellow "Warning: $sourcePath does not exist, skipping..."
    }
}

Write-Host -ForegroundColor Green "Standalone deployment built successfully."
