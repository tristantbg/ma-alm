<?php 

return function($site, $pages, $page) {
  $error = null;
  if(r::method() === 'POST') {
    // The form has been sent

    // Create a new page as child of the current page
    // You can also use a different page by using `page('whatever')->children()->create()`
    $p = page('feed');
    
    
    // Upload an image
    $upload = new Upload($p->root() . DS . uniqid().'-{safeFilename}', array(
      'input'     => 'file',
      'overwrite' => true
      ));

    if($file = $upload->file()) {

      dump(array(
        'file'     => $file->filename(),
        'mime'     => $file->mime(),
        'size'     => $file->size(),
        'niceSize' => $file->niceSize()
        ));

    } else {
      dump($upload->error());
    }
    
  }
  
  return compact('error');
};