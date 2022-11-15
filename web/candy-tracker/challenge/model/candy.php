<?php

class Candy
{
    public static $candyLogPath = '../candies.txt';

    public function __construct($name, $filename = null)
    {
        $this->name = $name;
        $this->filename = $filename ?? self::$candyLogPath;
    }

    public function logToFile()
    {
        file_put_contents($this->filename, PHP_EOL . $this->name, FILE_APPEND);
    }
}
