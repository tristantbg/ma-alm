<?php snippet('header') ?>

<div id="container">
<<<<<<< HEAD
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
=======
>>>>>>> design-ui

	<div class="inner">
		<?= $page->text()->kt() ?>
	</div>
  
</div>

<script>
	var collectionmode = false;
	var instamode = false;
	var $sitetitle = '<?= $site->title()->escape() ?>';
</script>

<?php snippet('footer') ?>