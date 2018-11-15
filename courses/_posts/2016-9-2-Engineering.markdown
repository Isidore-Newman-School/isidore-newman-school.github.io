---
title: Analysis, Design, and Engineering
galleryid: engineer
layout: course
syllabus: http://engineeryourworld.org/
img: engineering/cad1.png
description: This course is based on the Engineer Your World curriculum developed by UT Austin's Engineering Department. Students work on project-based, collaborative projects to explore engineering mindsets and disciplines.
links: <hr><a href="http://engineeryourworld.org/">Engineer Your World Curriculum</a>
---

{::options parse_block_html="true" /}

{% for project in site.data.engineer %}

<div class="clearfix headerText">
<div class="col-md-3 gallery">
[![alt text]({{ project.imagefolder }}/{{ project.images[0].thumb }}){:.img-responsive}]({{ project.imagefolder }}/{{ image.name }})
</div>
<div class="col-md-9">
<h4>[{{project.title}}]({{project.url}})</h4>
<p>{{project.description}}</p>
</div>
</div>
<hr>
{% endfor %}


{::options parse_block_html="false" /}
