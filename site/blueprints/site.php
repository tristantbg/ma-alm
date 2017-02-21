<?php if(!defined('KIRBY')) exit ?>

title: Site
fields:
  generalSettings:
    label: Site Settings
    type: headline
  menu1:
    label: SVG Menu 1
    type: textarea
    icon: code
  menu2:
    label: SVG Menu 2
    type: textarea
    icon: code
  menusmall1:
    label: SVG Menu Small 1
    type: textarea
    icon: code
  menusmall2:
    label: SVG Menu Small 2
    type: textarea
    icon: code
  title:
    label: Title
    type:  text
  description:
    label: Description
    type:  textarea
  keywords:
    label: Keywords
    type:  tags
  customcss:
    label: Custom CSS
    type: textarea
    buttons: false
  googleAnalytics:
    label: Google Analytics ID
    type: text
    icon: code
    help: Tracking ID in the form UA-XXXXXXXX-X. Keep this field empty if you are not using it.
    width: 1/2
  ogimage:
    label: Facebook OpenGraph image
    type: image
    help: 1200x630px minimum
    width: 1/2