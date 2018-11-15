---
title: Advanced Topics in Computer Science and Making
galleryid: advanced
layout: course
syllabus: https://docs.google.com/document/d/1_kzi7bw28xXFvDlTxW4ByZLIE32cYJPhxdBZyvlQjzM/edit?usp=sharing
img: advanced/gabe.jpg
description: Advanced Topics is designed to give students time and space to work on personally-meaningful topics in computer science and making. Students have worked on projects related to data science, machine learning, XBox Kinect, projection mapping, and more.
links: <hr><a href="https://docs.google.com/document/d/1_kzi7bw28xXFvDlTxW4ByZLIE32cYJPhxdBZyvlQjzM/edit?usp=sharing">Syllabus</a>
---

{::options parse_block_html="true" /}
{% for project in site.data.Advanced %}

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
