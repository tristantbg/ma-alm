<?php snippet('header') ?>

<div id="container">

	<div class="inner">
		<form enctype="multipart/form-data" action="" method="POST">
    <!-- MAX_FILE_SIZE must precede the file input field -->
    <!-- <input type="hidden" name="MAX_FILE_SIZE" value="30000" /> -->
    <!-- Name of input element determines name in $_FILES array -->
    Send this file: <input name="file" type="file" />
    <input type="submit" value="Send File" />
</form>
		<?= $page->text()->kt() ?>
	</div>
  
</div>

<script>
	var collectionmode = false;
	var instamode = false;
	var $sitetitle = '<?= $site->title()->escape() ?>';
</script>

<?php snippet('footer') ?>