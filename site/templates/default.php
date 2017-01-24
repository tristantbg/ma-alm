<?php snippet('header') ?>

<div id="container">
  <div id="target">
    <div id="top">
    	<div id="out-1" class="view out"></div>
    	<div id="inside-1" class="view inside"></div>
    </div>
    <div id="bottom">
    	<div id="inside-2" class="view inside"></div>
    	<div id="out-2" class="view out"></div>
    </div>
  </div>
  <div id="proxy"></div>
</div>

<?php 
$collectionImg = $pages->find('home')->images()->shuffle();
$thumbSize = 1000;

$collection = [];
foreach($collectionImg as $key => $img):
	$url = thumb($img, array('width'=> $thumbSize))->url();
	array_push($collection, $url);
endforeach;
?>

<script>
	var collection = <?= json_encode($collection) ?>;
</script>

<?php snippet('footer') ?>