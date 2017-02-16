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

<script>
	var collectionmode = false;
	var instamode = true;
	var hashtag = "<?= $page->hashtag() ?>";
	var $sitetitle = '<?= $site->title()->escape() ?>';
	var minBoxes = <?= $page->minboxes() ?>;
	var maxBoxes = <?= $page->maxboxes() ?>;
</script>

<?php snippet('footer') ?>