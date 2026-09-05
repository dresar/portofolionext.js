# Development Guide

## Masalah Hot Reload Tidak Berfungsi?

Jika perubahan tidak terlihat setelah restart server, coba langkah berikut:

### 1. Clear Cache dan Restart
```bash
# Hapus folder .next (cache Next.js)
npm run clean

# Restart server dengan fresh cache
npm run dev:fresh
```

### 2. Clear Browser Cache
- Tekan `Ctrl + Shift + R` (Windows/Linux) atau `Cmd + Shift + R` (Mac) untuk hard refresh
- Atau buka DevTools (F12) > Network tab > Enable "Disable cache"

### 3. Restart Server dengan Clean State
```bash
# Stop server (Ctrl + C)
# Hapus cache
npm run clean
# Start lagi
npm run dev
```

### 4. Jika Masih Bermasalah
```bash
# Hapus node_modules dan reinstall
rm -rf node_modules
npm install

# Hapus .next folder
npm run clean

# Start server
npm run dev
```

## Scripts yang Tersedia

- `npm run dev` - Start development server di port 3002
- `npm run dev:clean` - Start dengan turbo mode (faster)
- `npm run dev:fresh` - Clear cache dan start fresh
- `npm run clean` - Hapus folder .next (cache)
- `npm run build` - Build untuk production
- `npm start` - Start production server

## Tips

1. **Selalu gunakan hard refresh** (`Ctrl + Shift + R`) setelah perubahan besar
2. **Clear cache** jika perubahan tidak terlihat
3. **Restart server** jika hot reload tidak bekerja
4. **Check console** untuk error yang mungkin menghalangi reload

