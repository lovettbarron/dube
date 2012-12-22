<?php get_header(); ?>
			<script>
				var dube = dube || {};
				dube.mostRecent = <?php
					$last = wp_get_recent_posts( '1');
					$last_id = $last['0']['ID'];
					echo $last_id;
					?>;
			</script>
			<div id="content">
			
				<div id="inner-content" class="wrap clearfix">
			
				    <div id="main" role="main">

				    	<?php if(wp_count_posts() > 1) { ?>
				    	<!-- Next/previous buttons -->
				    	<div id="next" class="next">
				    		<a href="#next">Next</a>
				    	</div>
				    	<div id="prev" class="prev">
				    		<a href="#prev">Prev</a>
				    	</div>
				    	<?php } ?>

					    <?php /* if (have_posts()) : while (have_posts()) : the_post(); ?>
					
					    <article id="post-<?php the_ID(); ?>" <?php post_class('clearfix'); ?> role="article">
						<div class="video-container">
							    <?php echo get_the_content(); ?> 
						</div>
						    
						    <?php // comments_template(); // uncomment if you want to use them ?>
					
					    </article> <!-- end article -->
					
					    <?php endwhile; ?>	
					
					    <?php else : ?>
					    
					        <article id="post-not-found" class="hentry clearfix">
					            <header class="article-header">
					        	    <h1><?php _e("Oops, Post Not Found!", "bonestheme"); ?></h1>
					        	</header>
					            <section class="entry-content">
					        	    <p><?php _e("Uh Oh. Something is missing. Try double checking things.", "bonestheme"); ?></p>
					        	</section>
					        	<footer class="article-footer">
					        	    <p><?php _e("This is the error message in the index.php template.", "bonestheme"); ?></p>
					        	</footer>
					        </article>
					
					    <?php endif; */?>
			
				    </div> <!-- end #main -->
				    
				</div> <!-- end #inner-content -->
    
			</div> <!-- end #content -->
			<div id="about"><?php show_post("about"); ?></div>
<?php get_footer(); ?>
