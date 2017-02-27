<?php snippet('header') ?>

<div id="container">

	<div class="inner">
		<?= $page->text()->kt() ?>
	</div>

	<div id="choose">
		<div class="menu-item">
		<?php $target = $pages->find('collection') ?>
		<a href="<?= $target->url() ?>" data-title="<?= $target->title()->html() ?>" data-target="page">
		<?= $site->menu1() ?>
		</a>
		</div>
		<div class="menu-item">
		<?php $target = $pages->find('feed') ?>
		<a href="<?= $target->url() ?>" data-title="<?= $target->title()->html() ?>" data-target="page">
		<?= $site->menu2() ?>
		</a>
		</div>
	</div>
  
</div>

<script>
	var collectionmode = false;
	var instamode = false;
	var $sitetitle = '<?= $site->title()->escape() ?>';
</script>

<?php snippet('footer') ?>