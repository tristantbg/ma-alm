<?php snippet('header') ?>

<div id="container">

	<div class="inner">
		<?= $page->text()->kt() ?>
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
  
</div>

<script>
	var collectionmode = false;
	var instamode = false;
	var $sitetitle = '<?= $site->title()->escape() ?>';
</script>

<footer>
	<div id="privacy">
	<small>
	<a href="<?= $pages->find('privacy-policy')->url() ?>" data-target="page"><?= $pages->find('privacy-policy')->title()->html() ?></a>
	</small>
	</div>
</footer>

<?php snippet('footer') ?>