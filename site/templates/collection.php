<?php snippet('header') ?>

<div id="container">
  <div id="target" class="<?php e($page->contain()->bool(),'contain'); ?>">
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
$collectionImg = $page->images()->shuffle();
//$thumbSize = 1500;

$collectionPortrait = [];
$collectionLandscape = [];
foreach($collectionImg as $key => $img):
	//$srcset = '';
	//for ($i = 500; $i <= 2500; $i += 500) $srcset .= resizeOnDemand($img, $i) . ' ' . $i . 'w,';
	//$url = thumb($img, array('width'=> $thumbSize))->url();
	if ($img->orientation() == 'portrait') {
		//array_push($collectionPortrait, $srcset);
		//array_push($collectionPortrait, resizeOnDemand($img, $thumbSize));
		array_push($collectionPortrait, $img->url());
	} else {
		//array_push($collectionLandscape, $srcset);
		//array_push($collectionLandscape, resizeOnDemand($img, $thumbSize));
		array_push($collectionLandscape, $img->url());
	}
endforeach;
?>

<script>
	var collection = {'landscape':<?= json_encode($collectionLandscape) ?>, 'portrait': <?= json_encode($collectionPortrait) ?>};
	var collectionmode = true;
	var instamode = false;
	var $sitetitle = '<?= $site->title()->escape() ?>';
	var minBoxes = <?= $page->minboxes() ?>;
	var maxBoxes = <?= $page->maxboxes() ?>;
</script>

<?php snippet('footer') ?>