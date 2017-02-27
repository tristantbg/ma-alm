<?php if(!defined('KIRBY')) exit ?>

title: Feed
pages: true
files: true
fields:
  title:
    label: Title
    type:  text
    width: 1/2
  feedid:
    label: Juicer.io Feed ID
    type:  text
    icon: code
    width: 1/2
  minboxes:
    label: Min boxes
    type: number
    min: 0
    default: 3
    width: 1/3
  maxboxes:
    label: Max boxes
    type: number
    min: 0
    default: 10
    width: 1/3
  contain:
    label: Contain images
    type: toggle
    options: yes/no
    default: no
    width: 1/3