<?php
$flag_path = 'flag.txt';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['key'])) {
    $cmd = 'diff -w ' . $flag_path . ' <(echo ' . $_POST['key'] . ')';
    exec($cmd, $output, $status);
    if ($status === 0) {
        $green = true;
        $message = 'Thank you for making me rich. ' . file_get_contents('flag.txt') . ' is correct.';
    } else {
        $green = false;
        $message = 'You have entered the wrong key. Can\'t copy-paste? Or are you a cheapskate? I\'ll just sell your data if you do not send me money.';
    }
}
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Ransom Candy</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="style.css">

</head>

<body>
    <div class="col align-center">
        <div class="row">
            <div class="col">
                <img src="jigsaw.png" style="width: 300px;">

            </div>
            <div class="col-md-auto">
                <div class="mt-4 mb-3">
                    <div class="display-3">You got hacked.</div>
                </div>
                <div class="h5 mb-5">
                    <p>You have 24 hours to send me 500 Bitcoin through <a href="https://r.mtdv.me/tQfcpjdhum" target="_blank">
                            this shady
                            link.</a></p>
                    <p>I'll then send you my super secret key to decrypt your data...</p>
                </div>
                <form method="post">
                    <div class="row">
                        <div class="col col-md-auto">
                            <input placeholder="Decryption key" class="form-control bg-dark" name="key" required></textarea>
                        </div>
                        <div class="d-flex">
                            <div class="col">
                                <button type="submit" class="btn btn-dark">Decrypt</button>
                            </div>
                            <div class="col">
                                <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#modal">
                                    ?
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

                <!-- Modal -->
                <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="modalLabel">How do I generate my keys?</h5>
                            </div>
                            <div class="modal-body">
                                You cannot brute force guess the key in any way. I have written by hand more than 100
                                long
                                keys, for my sweet hackings. I'll check that the key you send is in fact one of mine
                                with a
                                special program of mine.
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Ok, I'm
                                    impressed enough</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <?php
        if (isset($message)) {
            if ($green) {
                echo '<div style="max-width: 600px;" class="slide alert alert-success mt-5" role="alert">' . $message . '</div>';
            } else {
                echo '<div style="max-width: 600px;" class="slide alert alert-danger mt-5" role="alert">' . $message . '</div>';
            }
            echo '<!-- Debug --><div style="display: none;">executed cmd: ' . $cmd . '</div>';
        }
        ?>
    </div>
</body>

</html>