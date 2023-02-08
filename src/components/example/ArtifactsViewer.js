import React from 'react'
import { colors, LayoutBand, Skeleton, Image } from '@fs/zion-ui'
import { css } from '@emotion/core'
import { useAxios } from '@fs/zion-axios'
import { HorizontalScroller } from '@fs/zion-ui/quarks-authorized-use-only'
import Banner from './Banner'

const artifactsCss = css`
  margin: 0 -24px;
`
const artifactsViewSkeletonCss = css`
  margin: 0 -24px;
  display: flex;
  & > div {
    margin-right: 8px;
  }
`

const ArtifactsViewSkeleton = () => {
  return (
    <div css={artifactsViewSkeletonCss}>
      <Skeleton.Image height={250} width={183} />
      <Skeleton.Image height={250} width={186} />
      <Skeleton.Image height={250} width={250} />
      <Skeleton.Image height={250} width={181} />
      <Skeleton.Image height={250} width={373} />
      <Skeleton.Image height={250} width={200} />
    </div>
  )
}

const ArtifactsViewer = ({ user: { cisId } }) => {
  const artifactsUrl = `/service/memories/presentation/patrons/${cisId}/persons?numTaggedPersonArtifacts=3&includeTaggedPersons=true&includeEmptyPersons=false&includeHistory=false`
  // Use our custom hook
  const { data, error, loading } = useAxios(artifactsUrl)

  function renderError() {
    return (
      <Banner
        color={colors.danger20}
        message="Sorry! Something went wrong and we couldn't display your ancesters' photos."
      />
    )
  }

  function renderArtifacts() {
    if (data && data.length > 0) {
      const photos = removeDuplicates(data)
      return (
        <div css={artifactsCss}>
          <PhotoViewer photos={photos} />
        </div>
      )
    }
    return renderNoArtifacts()
  }

  function renderNoArtifacts() {
    return (
      <Banner
        color={colors.yellow20}
        message="Sorry but your ancestors must have been camera shy, we couldn't find any photos"
      />
    )
  }

  function removeDuplicates(d) {
    const photos = d
      .filter((arts) => arts.featuredImages.length > 0)
      .map((a) => ({
        id: a.featuredImages[0].apid,
        url: a.featuredImages[0].thumbUrl,
        alt: a.featuredImages[0].title,
      }))

    const photoSet = Array.from(new Set(photos.map((p) => p.id))).map((id) => photos.find((p) => p.id === id))
    return { photos: photoSet }
  }

  // use-axios-client provides these states for us:
  return (
    <LayoutBand>
      {loading && (!data || !data.length) && <ArtifactsViewSkeleton />}
      {error && renderError()}
      {data && renderArtifacts()}
    </LayoutBand>
  )
}

const photoViewerCss = css`
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  position: relative;
`

const PhotoViewer = ({ photos, height = 250 }) => {
  return (
    <HorizontalScroller css={photoViewerCss} style={{ height }}>
      {photos.photos.map((photo) => (
        <Image noCrop src={photo.url} alt={photo.alt} height={height} width="auto" />
      ))}
    </HorizontalScroller>
  )
}

export default React.memo(ArtifactsViewer)
