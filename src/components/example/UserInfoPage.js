import React from 'react'
import { useUser } from '@fs/zion-user'
import { useTranslation } from 'react-i18next'
import { parse, format } from '@fs/zion-locale/date-fns'
import {
  Row,
  Grid,
  HeaderBlock,
  LayoutBand,
  List,
  ListItem,
  PersonBlock,
  Separator,
  ExpandableListItem,
} from '@fs/zion-ui'
import { NoticeLoading } from '@fs/zion-icon'
import ErrorBoundary from '@fs/zion-error-boundary'
import usePersonDetails from './personDetailsService'
import usePersonPortrait from './portraitService'
import ResponsiveDebug from './ResponsiveDebug'

export default function UserInfoPage() {
  const [t] = useTranslation()
  const user = useUser()

  if (!user.signedIn) return <NoticeLoading />

  return (
    <LayoutBand>
      <Separator size="sm" />
      <HeaderBlock
        size="lg"
        centered
        heading={t('welcome.message.name', 'Welcome to FamilySearch, {name}', { name: user.displayName })}
      />
      <Separator size="lg" />

      <ErrorBoundary>
        <UserInfo user={user} />
      </ErrorBoundary>
      <ResponsiveDebug />
    </LayoutBand>
  )
}

const UserInfo = React.memo(({ user }) => {
  const [{ portraitUrl }] = usePersonPortrait(user.personId)
  const [{ status: detailsStatus, details }] = usePersonDetails(user.personId)

  const fallback = (
    <Row alignX="center">
      <NoticeLoading size="lg" />
    </Row>
  )
  if (!(user && detailsStatus)) return fallback
  if (detailsStatus === 'FETCHING' || !details) return fallback

  const sex = user && user.gender ? user.gender.toLowerCase() : 'unknown'
  let birthDate
  try {
    birthDate = details.summary.lifespanBegin.date.original
    const parsedDate = parse(details.summary.lifespanBegin.date.formal, '+yyyy-MM-dd', new Date())
    birthDate = format(parsedDate, 'PPPP')
  } catch (err) {
    // console.warn('invalid birth date', err)
  }

  return (
    <Grid>
      <PersonBlock
        size="lg"
        avatarProps={{
          src: portraitUrl || '',
          sex,
        }}
        name={user.displayName}
        details={`${user.personId}`}
      />
      <List>
        <ExpandableListItem primaryText="Identification">
          <ListItem primaryText="CIS" rightElement={<ListItem.MetaText text={user.cisId} />} />
          <ListItem primaryText="PID" rightElement={<ListItem.MetaText text={user.personId} />} />
          <ListItem primaryText="Family Name" rightElement={<ListItem.MetaText text={details.familyName} />} />
          <ListItem primaryText="Full Name" rightElement={<ListItem.MetaText text={details.fullName} />} />
          <ListItem primaryText="Display Name" rightElement={<ListItem.MetaText text={user.displayName} />} />
          <ListItem primaryText="Contact Name" rightElement={<ListItem.MetaText text={user.contactName} />} />
          <ListItem primaryText="Gender" rightElement={<ListItem.MetaText text={user.gender} />} />
        </ExpandableListItem>
        <ExpandableListItem primaryText="Birth">
          <ListItem primaryText="Lifespan" rightElement={<ListItem.MetaText text={details.summary.lifespan} />} />
          <ListItem primaryText="Date of Birth" rightElement={<ListItem.MetaText text={birthDate} />} />
          <ListItem
            primaryText="Place of Birth"
            rightElement={
              <ListItem.MetaText text={details.summary.lifespanBegin && details.summary.lifespanBegin.place.original} />
            }
          />
        </ExpandableListItem>
        <ExpandableListItem primaryText="Stats">
          <ListItem
            primaryText="Contributor Count"
            rightElement={<ListItem.MetaText text={details.personStats.contributorCount} />}
          />
          <ListItem
            primaryText="User Change Count"
            rightElement={<ListItem.MetaText text={details.personStats.userChangeCount} />}
          />
        </ExpandableListItem>
      </List>
    </Grid>
  )
})
