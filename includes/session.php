<?php
if (!defined('_INCODE')) die('Access Deined...');

//Gán session
function setSession($key, $value)
{
  if (!empty(session_id())) {
    $_SESSION[$key] = $value;
    return true;
  }
  return false;
}

//Đọc session
function getSession($key = '')
{
  if (empty($key)) {
    return $_SESSION;
  } else {
    if (isset($_SESSION[$key])) {
      return $_SESSION[$key];
    }
  }
}

//Xoá session
function removeSession($key = '')
{
  if (empty($key)) {
    session_destroy();
    return true;
  } else {
    if (isset($_SESSION[$key])) {
      unset($_SESSION[$key]);
      return true;
    }
  }
  return false;
}

//Hàm flash data
function setFlashData($key, $value)
{
  $key = 'flash_' . $key;
  return setSession($key, $value);
}

//get flash data
function getFlashData($key)
{
  $key = 'flash_' . $key;
  $data = getSession($key);
  removeSession($key);
  return $data;
}
