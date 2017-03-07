<?php snippet('header') ?>

<div id="container">

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