<?php snippet('header') ?>

<div id="container">
  <div id="target" class="<?php e($page->contain()->bool(),'contain '); e($page->outlines()->bool(),'outlines') ?>">
  	<div id="reference">
		<div id="col-1" class="column left">
			<div id="l-out-1" class="view out"></div>
			<div id="l-in-1" class="view inside"></div>
			<div id="l-in-2" class="view inside"></div>
			<div id="l-out-2" class="view out"></div>
		</div>
		<div id="col-2" class="column right">
			<div id="r-out-1" class="view out"></div>
			<div id="r-in-1" class="view inside"></div>
			<div id="r-in-2" class="view inside"></div>
			<div id="r-out-2" class="view out"></div>
		</div>
    </div>
    <div id="clone"></div>
  </div>
  <div id="proxy"></div>
</div>

<?php 
$collectionImg = $pages->find('home')->images()->shuffle();
$thumbSize = 1500;

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