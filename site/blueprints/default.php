<?php if(!defined('KIRBY')) exit ?>

title: Page
pages: true
files: true
fields:
  title:
    label: Title
    type:  text
  contain:
    label: Contain images
    type: toggle
    options: yes/no
    default: no
  repeat:
    label: Repeat images
    type: toggle
    help: Only on contain mode
    options: yes/no
    default: no
  outlines:
    label: Show outlines
    type: toggle
    options: yes/no
    default: no