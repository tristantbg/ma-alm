<?php snippet('header') ?>

<div id="container">

	<div class="inner">
		<?= $page->text()->kt() ?>
		<br><br>
		<div style="text-align: left;"><small>Discover</small></div>	
	</div>
  
</div>

<script>
	var collectionmode = false;
	var instamode = false;
	var $sitetitle = '<?= $site->title()->escape() ?>';
</script>

<?php snippet('footer') ?>