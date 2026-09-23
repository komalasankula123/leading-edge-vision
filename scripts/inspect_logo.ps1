Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap("d:\Desktop\Leading Edge Vision\assets\images\official-logo-transparent.png")
Write-Output ("Size: {0}x{1}" -f $bmp.Width, $bmp.Height)

$nonTrans = 0
$blackCount = 0
$whiteCount = 0
$goldCount = 0

for ($y = 0; $y -lt $bmp.Height; $y += 5) {
  for ($x = 0; $x -lt $bmp.Width; $x += 5) {
    $p = $bmp.GetPixel($x, $y)
    if ($p.A -gt 30) {
      $nonTrans++
      if ($p.R -lt 50 -and $p.G -lt 50 -and $p.B -lt 50) { $blackCount++ }
      elseif ($p.R -gt 200 -and $p.G -gt 200 -and $p.B -gt 200) { $whiteCount++ }
      elseif ($p.R -gt 150 -and $p.G -gt 120 -and $p.B -lt 80) { $goldCount++ }
    }
  }
}

Write-Output ("Non-trans samples: {0}, Black: {1}, White: {2}, Gold/Yellow: {3}" -f $nonTrans, $blackCount, $whiteCount, $goldCount)
$bmp.Dispose()
