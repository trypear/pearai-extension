const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const unzipper = require("unzipper");

// Get command line arguments
const args = process.argv.slice(2);
const isPreRelease = args.includes("--pre-release");
const buildDir = "build";
const outDir = args.find(arg => !arg.startsWith("--")) || "build";

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const command = isPreRelease
  ? `npx vsce package --pre-release --no-dependencies --yarn --out ${buildDir}`
  : `npx vsce package --no-dependencies --yarn --out ${buildDir}`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${stderr}`);
    throw error;
  }
  console.log(stdout);

  const vsixFileMatch = stdout.match(/Packaged:\s+(.*\.vsix)/);
  if (!vsixFileMatch || !vsixFileMatch[1]) {
    console.error("Could not determine VSIX file name from vsce output");
    return;
  }
  const vsixFile = vsixFileMatch[1];
  const vsixPath = path.resolve(vsixFile);

  console.log(`VSIX package created: ${vsixPath}`);

  const extractDir = path.join(buildDir, "extracted");

  // Extract the VSIX file
  fs.createReadStream(vsixPath)
    .pipe(unzipper.Extract({ path: extractDir }))
    .on("close", () => {
      console.log(`VSIX extracted to ${extractDir}`);
      const extensionDir = path.join(extractDir, "extension");
      const finalOutputDir = path.join(outDir, path.basename(vsixFile, ".vsix"));

      if (!fs.existsSync(finalOutputDir)) {
        fs.mkdirSync(finalOutputDir, { recursive: true });
      }

      // Move files from extracted/extension to finalOutputDir
      fs.readdir(extensionDir, (err, files) => {
        if (err) { throw err; }
        files.forEach(file => {
          const srcPath = path.join(extensionDir, file);
          const destPath = path.join(finalOutputDir, file);
          fs.renameSync(srcPath, destPath);
        });
        fs.rmdirSync(extensionDir); // Remove the empty directory
        console.log(`Contents moved to ${finalOutputDir}`);

        // Cleanup extracted directory
        fs.rmdirSync(extractDir, { recursive: true });
      });
    })
    .on("error", err => {
      console.error(`Error extracting VSIX: ${err}`);
    });
});
