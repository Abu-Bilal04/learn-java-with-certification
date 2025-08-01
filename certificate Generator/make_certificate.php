<?php
    // For generating pdf
    require('fpdf/fpdf.php');

    function pixel_to_pt($px)
    {
        return round(0.75*$px);
    }
    
    function pt_to_pixel($pt)
    {
        return round(4*$pt/3);
    }
    
    function make_participation_certificate($name, $event)
    {
        $certificate_dimensions = array(pixel_to_pt(1123), pixel_to_pt(794));
        $name_pos = array(pixel_to_pt(465), pixel_to_pt(415));
        $name_size = array(pixel_to_pt(637), pixel_to_pt(0));
        $event_pos = array(pixel_to_pt(520), pixel_to_pt(528));
        $event_size = array(pixel_to_pt(221), pixel_to_pt(23));
        $certificate_template = "res/e.png";
        
        $certificate = new FPDF("Landscape", "pt", $certificate_dimensions);
        $certificate->AddPage();
            
        $certificate->Image($certificate_template, 0, 0, $certificate_dimensions[0], $certificate_dimensions[1]);
        $certificate->SetFont("Times", "", 44);
        $certificate->SetXY($name_pos[0], $name_pos[1]);
        $certificate->Cell($name_size[0], $name_size[1], $name, 0, 0, "C");
        $certificate->SetFont("Times", "", 16);
        $certificate->SetXY($event_pos[0], $event_pos[1]);
        $certificate->Cell($event_size[0], $event_size[1], $event, 0, 0, "C");
    
        $certificate->Output("I", "certificate.pdf");        
    }
    
    // Main
    if($_POST["name"] && $_POST["event"])
    {
        $name = $_POST["name"];
        $event = $_POST["event"];
        
        make_participation_certificate($name, $event);
        
        echo "<h1> Generated certificate </h1>";
        exit();
    }

    if($_POST["name"] && $_FILES["photo"])
    {
        $errors = array();
        $file_name = $_FILES["photo"]["name"];
        $file_tmp = $_FILES["photo"]["tmp_name"];
        $file_type = $_FILES["photo"]["type"];
        $tmp = explode('.', $file_name);
        $file_ext = strtolower(end($tmp));
        $extensions = array("jpeg", "jpg", "png");
        $name = $_POST["name"];

        if(in_array($file_ext, $extensions) === false)
        {
            array_push($errors, "Image format not allowed, please choose a JPEG or PNG file.");
        }

        if(empty($errors))
        {
            // Move file to uploads temporarily
            move_uploaded_file($file_tmp, "uploads/" . $file_name);
            
            // Describe certificate format

            // Config (use class for advanced functionality)
            $certificate = new FPDF("Landscape", "pt", "A4");
            $certificate->AddPage();
            $certificate->SetFont("Times", "", 12);
            
            // Content
            $certificate->Image("uploads/" . $file_name, 10, 10, 100, 128);
            $certificate->Text(30, 30, $name);

            // Generation
            $certificate->Output("D", "certificate.pdf");
            
            // Delete image
            unlink("uploads/" . $file_name);

            echo "<h1> Generated certificate </h1>";
            exit();
        }
        else
        {
            foreach ($errors as $err) {
                echo "<h1>" . $err . "</h1>";
            }
        }

        
    }
    else
    {
        echo "<h1 style='color:red'> Fill Name Before Getting Certificate</h1>";
    }
    
?>