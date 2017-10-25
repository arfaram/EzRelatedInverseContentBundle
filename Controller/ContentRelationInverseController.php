<?php

namespace Ez\RelatedInverseContentBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use eZ\Publish\API\Repository\Values\Content\Relation as APIRelation;

class ContentRelationInverseController extends Controller
{


    public function loadRelatedInverseRealtionsAction($id)
    {
        //load content info
        $contentService = $this->get('ezpublish.api.service.content');
        $contentInfo = $contentService->loadContentInfo($id);

        //load inverse relations
        $contentInverseRelations = $contentService->loadReverseRelations($contentInfo);

        //print_r($contentInverseRelations);exit;
        $locationService = $this->get('ezpublish.api.service.location');
        $contentTypeService = $this->get('ezpublish.api.service.content_type');

        $contentType = $contentTypeService->loadContentType(2,array('ger-DE'));


        foreach ($contentInverseRelations as $contentInverseRelation)
        {

            $location = $locationService->loadLocation($contentInverseRelation->sourceContentInfo->mainLocationId);


            $platformUrl = sprintf(
                '/api/ezp/v2/content/locations%s',
                substr($location->pathString,0,-1)

            );
            $locationRoute = $this->container->get('router')->generate( $location, array(), true );

            $type = $contentInverseRelation->type;

            if ($type == APIRelation::EMBED)
                $type = "EMBED";
            if ($type == APIRelation::FIELD)
                $type = "FIELD";

            $contentTypeService->loadContentType($contentInverseRelation->sourceContentInfo->contentTypeId);


            $relations [] = [
                'name' => $contentInverseRelation->sourceContentInfo->name,
                'contentTypeId' => $contentInverseRelation->sourceContentInfo->contentTypeId,
                'contentTypeName' => $contentType->names[$contentType->mainLanguageCode],
                'locationRoute' => $locationRoute,
                'link' => '/ez#/view/'.urlencode($platformUrl).'/'.$contentInverseRelation->sourceContentInfo->mainLanguageCode,
                'mainLanguageCode'    => $contentInverseRelation->sourceContentInfo->mainLanguageCode,
                'type'  => $type,

            ];
        }

        return new JsonResponse($relations);
    }
}
