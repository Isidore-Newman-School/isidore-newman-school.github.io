---
title: The Art of Making
layout: course
syllabus: https://docs.google.com/document/d/1iME5lpYk23gugmj-ZR5-RzBcaOKsVtZB7jOqLTAwX4U/edit?usp=sharing
img: arduino/digger/1.jpg
description: This course is a hands-on introduction to the technology and mindsets of making. Projects will introduce students to coding, engineering, and design thinking by leveraging tools like Arduinos, 3D printers, laser cutters, and more. Wearable tech, 3D printed boats, line-following robots, and electronic music instruments are just a few examples of potential projects created in this course.
links: <hr><a href="https://docs.google.com/document/d/1iME5lpYk23gugmj-ZR5-RzBcaOKsVtZB7jOqLTAwX4U/edit?usp=sharing"> Syllabus</a>
---

{::options parse_block_html="true" /}
{% for project in site.data.arduino_projects %}
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
