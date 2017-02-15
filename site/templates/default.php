<?php snippet('header') ?>

<header>
	<img src="<?= url('assets/images/logo.png') ?>" alt="" width="200px">
</header>

<div id="container">
  <div id="target" class="<?php e($page->contain()->bool(),'contain'); e($page->outlines()->bool(),' outlines'); e($page->repeat()->bool(),' repeat') ?>">
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
    <div id="clone">
    	<div id="c_col-1" class="column left">
			<div id="c_l-out-1" class="view out"></div>
			<div id="c_l-in-1" class="view inside"></div>
			<div id="c_l-in-2" class="view inside"></div>
			<div id="c_l-out-2" class="view out"></div>
		</div>
		<div id="c_col-2" class="column right">
			<div id="c_r-out-1" class="view out"></div>
			<div id="c_r-in-1" class="view inside"></div>
			<div id="c_r-in-2" class="view inside"></div>
			<div id="c_r-out-2" class="view out"></div>
		</div>
    </div>
  </div>
  <div id="proxy"></div>
</div>

<?php 
$collectionImg = $pages->find('home')->images()->shuffle();
$thumbSize = 1500;

$collectionPortrait = [];
$collectionLandscape = [];
foreach($collectionImg as $key => $img):
	//$srcset = '';
	//for ($i = 500; $i <= 2500; $i += 500) $srcset .= resizeOnDemand($img, $i) . ' ' . $i . 'w,';
	//$url = thumb($img, array('width'=> $thumbSize))->url();
	if ($img->orientation() == 'portrait') {
		//array_push($collectionPortrait, $srcset);
		array_push($collectionPortrait, resizeOnDemand($img, $thumbSize));
	} else {
		//array_push($collectionLandscape, $srcset);
		array_push($collectionLandscape, resizeOnDemand($img, $thumbSize));
	}
endforeach;
?>

<script>
	var collection = {'landscape':<?= json_encode($collectionLandscape) ?>, 'portrait': <?= json_encode($collectionPortrait) ?>};
	var instamode = false;
</script>

<?php snippet('footer') ?>