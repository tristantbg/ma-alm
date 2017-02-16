<?php if(!defined('KIRBY')) exit ?>

title: Collection
pages: true
files: true
fields:
  title:
    label: Title
    type:  text
  minboxes:
    label: Min boxes
    type: number
    min: 0
    default: 3
    width: 1/2
  maxboxes:
    label: Max boxes
    type: number
    min: 0
    default: 10
    width: 1/2
  contain:
    label: Contain images
    type: toggle
    options: yes/no
    default: no
    width: 1/3
  repeat:
    label: Repeat images
    type: toggle
    help: Only on contain mode
    options: yes/no
    default: no
    width: 1/3
  outlines:
    label: Show outlines
    type: toggle
    options: yes/no
    default: no
    width: 1/3