Add-Type -AssemblyName System.Drawing

$src = "C:\Users\PC\.gemini\antigravity-ide\brain\96797f68-f379-4269-8a76-cfa8bc5dffa9\.user_uploaded\media_1789985168714.png"
$dstVisual = "d:\Desktop\Leading Edge Vision\assets\images\stem-tour-banner-visual.png"
$dstFull = "d:\Desktop\Leading Edge Vision\assets\images\stem-tour-brochure.png"

# Copy full brochure image as well
Copy-Item -Path $src -Destination $dstFull -Force

$bmp = [System.Drawing.Bitmap]::FromFile($src)
Write-Output "Image size: $($bmp.Width) x $($bmp.Height)"

# Crop the left visual art (Mount Fuji, students, Pagoda, STEM red circle badge)
# The left visual is roughly from x=0 to x = 45% of width
$cropWidth = [int]($bmp.Width * 0.445)
$cropRect = New-Object System.Drawing.Rectangle(0, 0, $cropWidth, $bmp.Height)

$croppedBmp = $bmp.Clone($cropRect, $bmp.PixelFormat)
$croppedBmp.Save($dstVisual, [System.Drawing.Imaging.ImageFormat]::Png)

$croppedBmp.Dispose()
$bmp.Dispose()

Write-Output "Saved cropped visual to $dstVisual"
