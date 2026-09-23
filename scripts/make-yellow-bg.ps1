Add-Type -AssemblyName System.Drawing

$srcPath = "d:\Desktop\Leading Edge Vision\assets\images\inclusions-bg.jpg"
$dstPath = "d:\Desktop\Leading Edge Vision\assets\images\inclusions-yellow-bg.jpg"

$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
$newBmp = New-Object System.Drawing.Bitmap($bmp.Width, $bmp.Height)
$g = [System.Drawing.Graphics]::FromImage($newBmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

# ColorMatrix for rich, warm sunset gold / amber tones (matching Rayeesi reference):
$cm = New-Object System.Drawing.Imaging.ColorMatrix
$cm.Matrix00 = 1.38 # Red boost
$cm.Matrix11 = 1.08 # Green (balanced with red for warm golden amber)
$cm.Matrix22 = 0.52 # Blue
$cm.Matrix33 = 1.00 # Alpha
$cm.Matrix40 = 0.18 # Warm golden-red offset
$cm.Matrix41 = 0.11 # Golden offset
$cm.Matrix42 = -0.04 # Blue offset

$ia = New-Object System.Drawing.Imaging.ImageAttributes
$ia.SetColorMatrix($cm, [System.Drawing.Imaging.ColorMatrixFlag]::Default, [System.Drawing.Imaging.ColorAdjustType]::Bitmap)

$rect = New-Object System.Drawing.Rectangle(0, 0, $bmp.Width, $bmp.Height)
$g.DrawImage($bmp, $rect, 0, 0, $bmp.Width, $bmp.Height, [System.Drawing.GraphicsUnit]::Pixel, $ia)

# Golden-amber sunset radial/linear wash
$brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.Point(0, 0)),
    (New-Object System.Drawing.Point(0, [int]($bmp.Height * 0.85))),
    [System.Drawing.Color]::FromArgb(90, 255, 185, 30),
    [System.Drawing.Color]::FromArgb(25, 200, 130, 20)
)
$skyRect = New-Object System.Drawing.Rectangle(0, 0, $bmp.Width, [int]($bmp.Height * 0.85))
$g.FillRectangle($brush, $skyRect)

$brush.Dispose()
$g.Dispose()
$ia.Dispose()
$bmp.Dispose()

$newBmp.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$newBmp.Dispose()
Write-Output "Warm golden yellowish background image generated successfully"
