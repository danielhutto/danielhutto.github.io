<?php
$pdfFile = 'files\DanielHuttoResume.pdf';

// Generate HTML code to open the PDF file in a new window/tab
echo '<a href="' . $pdfFile . '" target="_blank">Click here to open the PDF</a>';

// Generate HTML code to embed the PDF file on the webpage
echo '<embed src="' . $pdfFile . '" type="application/pdf" width="100%" height="600px" />';
?>