// index.js - Student Starter Skeleton
// TODO 1: Import built-in Node modules (os, fs/promises, path)
import os from 'os';
// TODO 2: Import third-party NPM packages (chalk)
import chalk from 'chalk';
import fs from 'fs-extra';

async function generateTelemetryReport() {
    console.log("Initializing Node.js Telemetry Engine...");

    try {
        // ==========================================
        // 1. HARVEST SYSTEM TELEMETRY (Built-in 'os' module)
        // ==========================================
        // TODO: Get CPU architecture, platform, free memory (in MB), and system uptime (in hours)
        const platform = os.platform();
        const freeMemMB = (os.freemem() / (1024 * 1024)).toFixed(0);
        const totalMemMB = (os.totalmem() / (1024 * 1024)).toFixed(0);
        const usedMemMB = (os.totalmem() / (1024 * 1024) - os.freemem() / (1024 * 1024)).toFixed(0);

        const cpuModel = os.cpus()[0].model;
        const uptimeHours = (os.uptime() / 3600).toFixed(2);

        // ==========================================
        // 2. RENDER FORMATTED TERMINAL LOGS (Third-Party 'chalk')
        // ==========================================
        // TODO: Print a colorful status report to the terminal using chalk colors
        console.log("==========================================");
        console.log("         SYSTEM & ENV TELEMETRY           ");
        console.log("==========================================");
        // Print Platform, Free Memory, and Uptime with custom colors
        console.log(`${chalk.bold("OS Platform:")}      ${chalk.yellow(platform)}`);
        console.log(`${chalk.bold("CPU Model:")}        ${chalk.cyan(cpuModel)}`);
        console.log(`${chalk.bold("Total Memory:")}     ${chalk.green(totalMemMB + " MB")}`);
        console.log(`${chalk.bold("Used Memory:")}      ${chalk.red(usedMemMB + " MB")}`);
        console.log(`${chalk.bold("Free Memory:")}      ${chalk.blue(freeMemMB + " MB")}`);
        console.log(`${chalk.bold("System Uptime:")}    ${chalk.magenta(uptimeHours + " hours")}`);





        // ==========================================
        // 3. WRITE PERMANENT LOG FILE (Built-in 'fs/promises')
        // ==========================================
        const logEntry = `${new Date().toISOString()}] PLATFORM: ${platform} | CPU: ${cpuModel} | TOTALMEM: ${totalMemMB}MB | USEDMEM: ${usedMemMB}MB | FREEMEM: ${freeMemMB}MB | UPTIME: ${uptimeHours}h`;
        
        // TODO: Append logEntry to 'telemetry.log' using fs.appendFile()
        console.log("Writing log entry to disk...");
        await fs.appendFile("telemetry.log", logEntry + "/n");

        console.log("Telemetry audit completed successfully!");

    } catch (error) {
        console.error("Telemetry report generation failed:", error.message);
    }
}

// Execute engine
generateTelemetryReport();
