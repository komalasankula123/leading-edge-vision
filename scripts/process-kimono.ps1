Add-Type -AssemblyName System.Drawing

$src = "C:\Users\PC\.gemini\antigravity-ide\brain\96797f68-f379-4269-8a76-cfa8bc5dffa9\japanese_welcoming_hostess_1789996928822.jpg"
$outPng = "D:\Desktop\Leading Edge Vision\assets\images\japanese-welcome-transparent.png"
$outJpg = "D:\Desktop\Leading Edge Vision\assets\images\japanese-welcome-kimono.jpg"

$bmp = [System.Drawing.Bitmap]::FromFile($src)
$bmp.Save($outJpg, [System.Drawing.Imaging.ImageFormat]::Jpeg)

# Also let's crop to upper-body and full-figure cleanly
# The woman is centered, width: 896, height: 1152
# Let's create an RGBA bitmap with transparent white background
$newBmp = New-Object System.Drawing.Bitmap($bmp.Width, $bmp.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $c = $bmp.GetPixel($x, $y)
        # Check if background white/near-white
        if ($c.R -gt 238 -and $c.G -gt 238 -and $c.B -gt 238) {
            $newBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } elseif ($c.R -gt 220 -and $c.G -gt 220 -and $c.B -gt 220) {
            # Smooth feathered alpha edge
            $alpha = [int](255 * (1.0 - (($c.R - 220) / 18.0)))
            if ($alpha -lt 0) { $alpha = 0 }
            if ($alpha -gt 255) { $alpha = 255 }
            $newBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $c.R, $c.G, $c.B))
        } else {
            $newBmp.SetPixel($x, $y, $c)
        }
    }
}

$newBmp.Save($outPng, [System.Drawing.Imaging.ImageFormat]::Png)
$newBmp.Dispose()
$bmp.Dispose()

Write-Output "Successfully processed transparent Japanese welcoming lady cutout"
