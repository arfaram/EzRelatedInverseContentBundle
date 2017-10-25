# RelatedInverseContentBundle
This is a dev Bundle to add new content detail tab where you can get more information about related inverse content.

== THIS BUNDLE IS NOT FOR PRODUCTION USE ==

## Install

1. Create src/**Ez** folder
2. Switch to the **Ez** folder and then clone the repository
```
    git clone https://github.com/ramzi-arfaoui/EzRelatedInverseContentBundle.git
```
3. add in AppKernel.php

```
    public function registerBundles()
    {
        $bundles = array(
            //...
            new Ez\RelatedInverseContentBundle\EzRelatedInverseContentBundle(),

```

## TODO

- Fix the hard coded contentID in JS plugin
- Fix the translation texts

## Screenshot

<img src="Resources/doc/relatedInverseContent.png">
