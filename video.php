<?php 
	//	Nav
   	if(wp_count_posts() > 1) { ?>
	<!-- Next/previous buttons -->
	<div id="next" class="next">
		<a href="#next">Next</a>
	</div>
	<div id="prev" class="prev">
		<a href="#prev">Prev</a>
	</div>
	<?php } ?>

	<article role="article">
	<div class="video-container">
		    <?php show_post($_GET['p']) ?> 
	</div>
    
    <?php // comments_template(); // uncomment if you want to use them ?>

</article> <!-- end article -->
