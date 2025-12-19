#!/usr/bin/env node
/**
 * SCRIPT DE ROLLBACK - Migración console.log
 * 
 * Protocolo SIGMA-99
 * 
 * Restaura archivos desde backups en caso de error en la migración.
 */

const fs = require('fs').promises;
const path = require('path');

const BACKUP_DIR = '.migration-backups';

async function rollback() {
    console.log('⏮️  Ejecutando rollback de migración...\n');

    try {
        const backups = await fs.readdir(BACKUP_DIR);

        for (const backupFile of backups) {
            const backupPath = path.join(BACKUP_DIR, backupFile);
            const originalPath = backupFile.replace(/_/g, path.sep);

            const content = await fs.readFile(backupPath, 'utf-8');
            await fs.writeFile(originalPath, content, 'utf-8');

            console.log(`✓ Restaurado: ${originalPath}`);
        }

        console.log(`\n✅ Rollback completado. ${backups.length} archivos restaurados.`);
    } catch (error) {
        console.error('❌ Error durante rollback:', error.message);
        process.exit(1);
    }
}

rollback();
