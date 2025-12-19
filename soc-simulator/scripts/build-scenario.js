#!/usr/bin/env node
import { execSync } from 'child_process'
import { renameSync, existsSync, mkdirSync, statSync, readdirSync, unlinkSync } from 'fs'
import { join, dirname, extname } from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, '..')

// Get scenario from command line argument
const scenario = process.argv[2]

if (!scenario) {
  console.error('Usage: node scripts/build-scenario.js <scenario-path>')
  console.error('Example: node scripts/build-scenario.js operation-glasshouse/session-1')
  process.exit(1)
}

// Check if scenario exists
const scenarioPath = join(rootDir, 'scenarios', scenario, 'index.js')
if (!existsSync(scenarioPath)) {
  console.error(`Scenario not found: ${scenarioPath}`)
  process.exit(1)
}

console.log(`\n🎮 Building SOC Simulator`)
console.log(`📁 Scenario: ${scenario}\n`)

// Optimize images in the scenario
const imgDir = join(rootDir, 'scenarios', scenario, 'img')
const optimizedDir = join(rootDir, 'scenarios', scenario, 'img-optimized')

if (existsSync(imgDir)) {
  console.log('🖼️  Optimizing images...')
  
  // Create optimized directory
  if (!existsSync(optimizedDir)) {
    mkdirSync(optimizedDir)
  }
  
  const imageFiles = readdirSync(imgDir).filter(f => 
    ['.jpg', '.jpeg', '.png', '.webp'].includes(extname(f).toLowerCase())
  )
  
  let totalOriginal = 0
  let totalOptimized = 0
  
  for (const file of imageFiles) {
    const inputPath = join(imgDir, file)
    const outputPath = join(optimizedDir, file.replace(/\.[^.]+$/, '.jpg'))
    
    const originalSize = statSync(inputPath).size
    totalOriginal += originalSize
    
    // Resize to 150x150 and compress
    await sharp(inputPath)
      .resize(150, 150, { fit: 'cover' })
      .jpeg({ quality: 80 })
      .toFile(outputPath)
    
    const optimizedSize = statSync(outputPath).size
    totalOptimized += optimizedSize
    
    console.log(`   ${file}: ${(originalSize/1024).toFixed(0)}KB → ${(optimizedSize/1024).toFixed(0)}KB`)
  }
  
  console.log(`   Total: ${(totalOriginal/1024).toFixed(0)}KB → ${(totalOptimized/1024).toFixed(0)}KB (${((1 - totalOptimized/totalOriginal) * 100).toFixed(0)}% reduction)\n`)
  
  // Swap directories for build
  const imgBackupDir = join(rootDir, 'scenarios', scenario, 'img-original')
  if (existsSync(imgBackupDir)) {
    // Clean up previous backup
    for (const f of readdirSync(imgBackupDir)) unlinkSync(join(imgBackupDir, f))
  } else {
    mkdirSync(imgBackupDir)
  }
  
  // Move original to backup, optimized to img
  for (const f of readdirSync(imgDir)) {
    renameSync(join(imgDir, f), join(imgBackupDir, f))
  }
  for (const f of readdirSync(optimizedDir)) {
    renameSync(join(optimizedDir, f), join(imgDir, f))
  }
}

// Run vite build with scenario environment variable
try {
  execSync(`SCENARIO="${scenario}" npm run build`, {
    cwd: rootDir,
    stdio: 'inherit'
  })
} catch (error) {
  // Restore original images before exiting
  if (existsSync(join(rootDir, 'scenarios', scenario, 'img-original'))) {
    restoreOriginalImages(scenario)
  }
  console.error('Build failed')
  process.exit(1)
}

// Restore original images after build
function restoreOriginalImages(scenario) {
  const imgDir = join(rootDir, 'scenarios', scenario, 'img')
  const imgBackupDir = join(rootDir, 'scenarios', scenario, 'img-original')
  const optimizedDir = join(rootDir, 'scenarios', scenario, 'img-optimized')
  
  if (existsSync(imgBackupDir)) {
    // Clear current img dir
    for (const f of readdirSync(imgDir)) unlinkSync(join(imgDir, f))
    // Move backup back to img
    for (const f of readdirSync(imgBackupDir)) {
      renameSync(join(imgBackupDir, f), join(imgDir, f))
    }
    // Clean up backup dir
    if (existsSync(imgBackupDir)) {
      for (const f of readdirSync(imgBackupDir)) unlinkSync(join(imgBackupDir, f))
      try { unlinkSync(imgBackupDir) } catch {}
    }
    // Clean up optimized dir
    if (existsSync(optimizedDir)) {
      for (const f of readdirSync(optimizedDir)) unlinkSync(join(optimizedDir, f))
      try { unlinkSync(optimizedDir) } catch {}
    }
  }
}

restoreOriginalImages(scenario)

// Create builds directory if it doesn't exist
const buildsDir = join(rootDir, 'builds')
if (!existsSync(buildsDir)) {
  mkdirSync(buildsDir)
}

// Rename output file
const outputName = `soc-sim-${scenario.replace(/\//g, '-')}.html`
const srcPath = join(rootDir, 'dist', 'index.html')
const destPath = join(buildsDir, outputName)

renameSync(srcPath, destPath)

const fileSizeMB = (statSync(destPath).size / 1024 / 1024).toFixed(2)

console.log(`\n✅ Build complete!`)
console.log(`📄 Output: builds/${outputName}`)
console.log(`📦 Size: ${fileSizeMB} MB\n`)
