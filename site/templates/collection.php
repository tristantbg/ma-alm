<?php snippet('header') ?>

<div id="container">
  <div id="target" class="<?php e($page->contain()->bool(),'contain'); e($page->outlines()->bool(),' outlines'); e($page->repeat()->bool(),' repeat') ?>">
  	<div id="reference">
		<div id="col-1" class="column left">
			<div id="l_out_1" class="view out">
				<canvas id="canvas_l_out_1" width="100%" height="100%"></canvas>
			</div>
			<div id="l_in_1" class="view inside">
				<canvas id="canvas_l_in_1" width="100%" height="100%"></canvas>
			</div>
			<div id="l_in_2" class="view inside">
				<canvas id="canvas_l_in_2" width="100%" height="100%"></canvas>
			</div>
			<div id="l_out_2" class="view out"></div>
		</div>
		<div id="col-2" class="column right">
			<div id="r_out_1" class="view out">
				<canvas id="canvas_r_out_1" width="100%" height="100%"></canvas>
			</div>
			<div id="r_in_1" class="view inside">
				<canvas id="canvas_r_in_1" width="100%" height="100%"></canvas>
			</div>
			<div id="r_in_2" class="view inside">
				<canvas id="canvas_r_in_2" width="100%" height="100%"></canvas>
			</div>
			<div id="r_out_2" class="view out"></div>
		</div>
    </div>
    <div id="clone">
    </div>
  </div>
  <div id="proxy"></div>
</div>

<?php 
$collectionImg = $page->images()->shuffle();
$thumbSize = 1500;

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