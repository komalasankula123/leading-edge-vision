Add-Type -AssemblyName System.Drawing

$inputPath = "d:\Desktop\Leading Edge Vision\assets\images\handshake-human-robot-light.jpg"
$outputPath = "d:\Desktop\Leading Edge Vision\assets\images\handshake-human-robot-transparent.png"

$src = [System.Drawing.Bitmap]::FromFile($inputPath)
$bmp = New-Object System.Drawing.Bitmap($src.Width, $src.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.DrawImage($src, 0, 0, $src.Width, $src.Height)
$g.Dispose()
$src.Dispose()

$rect = New-Object System.Drawing.Rectangle(0, 0, $bmp.Width, $bmp.Height)
$bmpData = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$byteCount = [Math]::Abs($bmpData.Stride) * $bmp.Height
$rgbValues = New-Object byte[] $byteCount
[System.Runtime.InteropServices.Marshal]::Copy($bmpData.Scan0, $rgbValues, 0, $byteCount)

# Format32bppArgb stores pixels as [Blue, Green, Red, Alpha]
for ($i = 0; $i -lt $byteCount; $i += 4) {
    $b = $rgbValues[$i]
    $gVal = $rgbValues[$i + 1]
    $r = $rgbValues[$i + 2]

    # If pixel is close to pure white, make it transparent
    if ($r -gt 240 -and $gVal -gt 240 -and $b -gt 240) {
        # Soft feather / transparency
        $minVal = [Math]::Min($r, [Math]::Min($gVal, $b))
        if ($minVal -gt 250) {
            $rgbValues[$i + 3] = 0 # 100% transparent
        } else {
            # Smooth fade at edges
            $alpha = [byte](255 - (($minVal - 240) * 25.5))
            $rgbValues[$i + 3] = $alpha
        }
    }
}

[System.Runtime.InteropServices.Marshal]::Copy($rgbValues, 0, $bmpData.Scan0, $byteCount)
$bmp.UnlockBits($bmpData)

$bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Host "Created transparent PNG successfully at $outputPath"
