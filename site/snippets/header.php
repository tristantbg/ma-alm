<!DOCTYPE html>
<html lang="en" class="no-js">
<head>

	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<link rel="dns-prefetch" href="//www.google-analytics.com">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<link rel="canonical" href="<?php echo html($page->url()) ?>" />
	<?php if($page->isHomepage()): ?>
		<title><?= $site->title()->html() ?></title>
	<?php else: ?>
		<title><?= $page->title()->html() ?> | <?= $site->title()->html() ?></title>
	<?php endif ?>
	<?php if($page->isHomepage()): ?>
		<meta name="description" content="<?= $site->description()->html() ?>">
	<?php else: ?>
		<meta name="DC.Title" content="<?= $page->title()->html() ?>" />
		<?php if(!$page->text()->empty()): ?>
			<meta name="description" content="<?= $page->text()->excerpt(250) ?>">
			<meta name="DC.Description" content="<?= $page->text()->excerpt(250) ?>"/ >
			<meta property="og:description" content="<?= $page->text()->excerpt(250) ?>" />
		<?php else: ?>
			<meta name="description" content="">
			<meta name="DC.Description" content=""/ >
			<meta property="og:description" content="" />
		<?php endif ?>
	<?php endif ?>
	<meta name="robots" content="index,follow" />
	<meta name="keywords" content="<?= $site->keywords()->html() ?>">
	<?php if($page->isHomepage()): ?>
		<meta itemprop="name" content="<?= $site->title()->html() ?>">
		<meta property="og:title" content="<?= $site->title()->html() ?>" />
	<?php else: ?>
		<meta itemprop="name" content="<?= $page->title()->html() ?> | <?= $site->title()->html() ?>">
		<meta property="og:title" content="<?= $page->title()->html() ?> | <?= $site->title()->html() ?>" />
	<?php endif ?>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="<?= html($page->url()) ?>" />
	<?php if($page->content()->name() == "project"): ?>
		<?php if (!$page->featured()->empty()): ?>
			<meta property="og:image" content="<?= resizeOnDemand($page->image($page->featured()), 1200) ?>"/>
		<?php endif ?>
	<?php else: ?>
		<?php if(!$site->ogimage()->empty()): ?>
			<meta property="og:image" content="<?= $site->ogimage()->toFile()->width(1200)->url() ?>"/>
		<?php endif ?>
	<?php endif ?>

	<meta itemprop="description" content="<?= $site->description()->html() ?>">
	<link rel="shortcut icon" href="">
	<link rel="icon" href="" type="image/x-icon">

	<?php 
	echo css('assets/css/build/build.min.css');
	echo js('assets/js/vendor/modernizr.min.js');
	?>
	
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	<script>window.jQuery || document.write('<script src="<?= url('assets/js/vendor/jquery.min.js') ?>">\x3C/script>')</script>

	<?php if(!$site->customcss()->empty()): ?>
		<style type="text/css">
			<?php echo $site->customcss()->html() ?>
		</style>
	<?php endif ?>

</head>
<body<?php e($page->isHomepage(), ' class="home"') ?><?php e($page->template() == 'default' OR $page->template() == 'error', ' class="page"') ?>>

<header>
	<div id="site-title">
	<?php if($page->isHomepage()): ?>
	<a href="http://www.marquesalmeida.com" target="_blank" alt="Marques'Almeida Website">
	<?php else: ?>
	<a href="<?= $site->url() ?>" data-target="index" alt="Back to Intro">
	<?php endif ?>
	<svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 500 62" style="enable-background:new 0 0 500 62;" xml:space="preserve">
	<g>
		<polygon points="24.3,31.7 17.3,53.2 17.2,53.2 10.8,31.7 0,31.7 0,61.3 6.2,61.3 6.2,36 6.2,35.9 14.4,61.3 19.8,61.3 28.4,35.9 
			28.5,36 28.5,61.3 34.7,61.3 34.7,31.7 	"/>
		<polygon points="371.8,31.7 364.8,53.2 364.7,53.2 358.3,31.7 347.5,31.7 347.5,61.3 353.7,61.3 353.7,36 353.7,35.9 361.9,61.3 
			367.3,61.3 375.9,35.9 376,36 376,61.3 382.2,61.3 382.2,31.7 	"/>
		<path d="M56.7,37.5L56.7,37.5L61,50.1h-8.9L56.7,37.5z M53,31.7L41.8,61.3h6.3l2.3-6.3h12.2l2.2,6.3h6.7L60.9,31.7H53z"/>
		<path d="M296.9,37.5L296.9,37.5l4.3,12.6h-8.9L296.9,37.5z M293.2,31.7L282,61.3h6.3l2.3-6.3h12.2l2.2,6.3h6.7l-10.7-29.5H293.2z"
			/>
		<path d="M485.1,37.5L485.1,37.5l4.3,12.6h-8.9L485.1,37.5z M481.4,31.7l-11.2,29.5h6.3l2.3-6.3h12.2l2.2,6.3h6.7l-10.7-29.5H481.4z
			"/>
		<g>
			<path d="M86,44.5h5.3c2.8,0,4.4-1.4,4.4-4.1c0-2.6-1.6-3.7-4.4-3.8H86V44.5z M86,61.3h-6.3V31.7h12.6c5.1,0,10.3,1.7,10.3,7.7
				c0,3.8-2.5,6.4-6.1,7.2v0.1c4.9,0.5,4.9,3.5,5.4,7.6c0.3,1.9,0.5,5.4,1.7,7h-7c-0.5-2.6-0.8-5.3-1.1-7.9c-0.2-1.6-0.6-3.9-2.7-4
				H86V61.3z"/>
			<path d="M132.1,46.5c0-5.1-1.2-10.8-7.4-10.8c-6.3,0-7.4,5.7-7.4,10.8s1.2,10.8,7.4,10.8C130.9,57.3,132.1,51.6,132.1,46.5
				 M140.3,61.3h-12.4c-0.5,0.2-1,0.3-1.6,0.4c-0.5,0.1-1.1,0.2-1.6,0.2c-9.8,0-14.2-6.7-14.2-15.4s4.4-15.4,14.2-15.4
				c9.8,0,14.2,6.7,14.2,15.4c0,3.2-2.2,8.5-4.4,10.4l0.1,0.1c0.6-0.2,2.1-0.3,3.6-0.3h2.1V61.3z"/>
			<path d="M173.4,31.7v18.5c0,7.9-5.6,11.7-12.8,11.7c-7.2,0-12.8-3.8-12.8-11.7V31.7h6.3v16c0,5,0.2,9.5,6.5,9.5s6.5-4.5,6.5-9.5
				v-16H173.4z"/>
		</g>
		<polygon points="184.3,31.7 184.3,61.3 204.5,61.3 204.5,56.4 190.6,56.4 190.6,48.5 203.2,48.5 203.2,43.6 190.6,43.6 190.6,36.6 
			204.1,36.6 204.1,31.7 	"/>
		<g>
			<path d="M228.8,40.2c-0.2-3-1.8-4.5-4.9-4.5c-2.3,0-4.7,1.2-4.7,3.8c0,3.2,2.9,3.6,5.4,4.2c4.5,1.1,11.1,2.4,11.1,8.3
				c0,7.3-6.4,9.9-12.7,9.9c-6.7,0-11.5-2.6-11.3-10.1h6.5c-0.2,3.3,1.6,5.5,5,5.5c2.5,0,5.9-0.8,5.9-3.9c0-3.5-4.2-3.7-6.8-4.4
				c-4.1-1-9.8-2.9-9.8-8.1c0-6.7,6.2-9.7,12.3-9.7c5.7,0,10.2,3.1,10.2,9H228.8z"/>
		</g>
		<polygon points="320.8,31.7 320.8,61.3 339.9,61.3 339.9,56.4 327.1,56.4 327.1,31.7 	"/>
		<polygon points="393.5,31.7 393.5,61.3 413.7,61.3 413.7,56.4 399.8,56.4 399.8,48.5 412.4,48.5 412.4,43.6 399.8,43.6 399.8,36.6 
			413.3,36.6 413.3,31.7 	"/>
		<rect x="422" y="31.7" width="6.3" height="29.5"/>
		<g>
			<path d="M445.9,56.4h3.4c7.8,0.1,8.9-5.2,8.9-9.9s-1.1-9.9-8.9-9.9h-3.4V56.4z M439.3,31.7h10.4c9.5-0.1,15.5,4.5,15.5,14.8
				s-5.9,14.9-15.5,14.8h-10.4V31.7z"/>
		</g>
		<rect x="244.7" y="19.6" transform="matrix(0.3505 -0.9366 0.9366 0.3505 152.423 265.8887)" width="46.4" height="6.9"/>
	</g>
	</svg>
	</a>
	</div>
	<div id="menu">
		
	<?php $target = $pages->find('collection') ?>
	<div id="menu-collection" class="menu-item<?php e($page->is($target), ' active') ?>">
	<a href="<?= $target->url() ?>" data-title="<?= $target->title()->html() ?>" data-target="page">
	<?= $site->menusmall1() ?>
	</a>
	</div>
	<?php $target = $pages->find('feed') ?>
	<div id="menu-feed" class="menu-item<?php e($page->is($target), ' active') ?>">
	<a href="<?= $target->url() ?>" data-title="<?= $target->title()->html() ?>" data-target="page">
	<?= $site->menusmall2() ?>
	</a>
	</div>

	</div>
</header>

<div id="outdated">
	<div class="inner">
	<p class="browserupgrade">You are using an <strong>outdated</strong> browser.
	<br>Please <a href="http://outdatedbrowser.com" target="_blank">upgrade your browser</a> to improve your experience.</p>
	</div>
</div>

<div id="loader">
	<div class="spinner">
		<svg class="circular" viewBox="25 25 50 50">
		<circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="1" stroke-miterlimit="10"></circle>
		</svg>
	</div>
</div>