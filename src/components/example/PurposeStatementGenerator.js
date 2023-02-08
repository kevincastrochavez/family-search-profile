import React, { useState } from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Card,
  colors,
  HeaderBlock,
  Row,
  Grid,
  Cell,
  Separator,
  useContainerWidth,
  useStatusOverlay,
  FlowGrid,
  LayoutBand,
  Body1,
} from '@fs/zion-ui'
import ZionForm, {
  useZionForm,
  useZionFormContext,
  useWatch,
  FormTextField,
  FormAutosuggest,
  FormCheckbox,
} from '@fs/zion-form'

// Create a list of options for the autosuggest form element
const emotions = ['joy', 'surprise', 'glee', 'astonishment', 'thirst', 'excitement']

const emotionOptions = emotions.map((emotion, idx) => ({
  id: idx,
  key: idx,
  primaryText: emotion,
}))

const defaultValues = {
  adjective1: 'inspiring',
  pluralNoun1: 'experiences',
  emotion1: emotionOptions[0],
  pluralNoun2: 'people',
  pluralNoun3: 'families',
  verb1: 'discover',
  verb2: 'gather',
  verb3: 'connect',
  timePeriod1: 'future',
  debug: false,
}

// Yup is a 3rd party library for validating
// objects. It has a similar api to prop-types.
// Docs here: https://www.npmjs.com/package/yup
const validationSchema = Yup.object().shape({
  adjective1: Yup.string()
    .matches(/ing$/, 'Must end with "ing"')
    .required('Required'),
  pluralNoun3: Yup.string()
    .min(3)
    .max(10)
    .required('Required'),

  pluralNoun1: Yup.string().required('Required'),
  emotion1: Yup.string()
    .required('Required')
    .nullable(),
  pluralNoun2: Yup.string().required('Required'),
  verb1: Yup.string().required('Required'),
  verb2: Yup.string().required('Required'),
  verb3: Yup.string().required('Required'),
  timePeriod1: Yup.string().required('Required'),
})

const valueHeaderMap = {
  values: 'Values',
  errors: 'Errors',
  touched: 'Touched',
  dirty: 'Dirty',
}

const ValueTable = ({ valueKey = 'values' }) => {
  // Warning: do not reference methods.formState.isValidating or methods.watch because it will cause severe performance problems with your form. If you think you need to use watch, you should probably use `useWatch` instead.
  const {
    watch,
    formState: { errors, dirtyFields, touchedFields },
  } = useZionFormContext()
  const fieldValues = watch()

  const filteredErrors = {}
  Object.keys(errors).forEach((key) => {
    filteredErrors[key] = { ...errors[key], ref: errors[key].ref ? 'will not display the ref' : undefined }
  })
  const formObj = {
    values: fieldValues,
    errors: filteredErrors,
    touched: touchedFields,
    dirty: dirtyFields,
  }
  const values = formObj[valueKey]
  return (
    <Card outlined>
      <LayoutBand top color={colors.gray05}>
        <HeaderBlock heading={valueHeaderMap[valueKey]} size="sm" />
      </LayoutBand>

      {Object.keys(values).length > 0 ? (
        <div style={{ whiteSpace: 'pre', lineHeight: '1.6em' }}>{JSON.stringify(values, null, 4)}</div>
      ) : (
        <Body1 secondary>None</Body1>
      )}
    </Card>
  )
}

const ValueTablesForExamplesOnly = ({ children }) => {
  const debug = useWatch({ name: 'debug' })
  const atWidth = useContainerWidth()
  return (
    <>
      {children}
      {debug && (
        <FlowGrid columnCount={atWidth({ default: 1, md: 2 })}>
          <ValueTable valueKey="values" />
          <ValueTable valueKey="errors" />
          <ValueTable valueKey="touched" />
          <ValueTable valueKey="dirty" />
        </FlowGrid>
      )}
    </>
  )
}

const PurposeStatementGenerator = () => {
  const [data, setData] = useState(defaultValues)
  const atWidth = useContainerWidth()
  const showStatusOverlay = useStatusOverlay()

  const onSubmit = (values) => {
    if (values) setData(values)
    showStatusOverlay({
      type: 'success',
      message: 'Way to go!',
    })
  }

  const methods = useZionForm({
    mode: 'all',
    defaultValues,
    resolver: yupResolver(validationSchema),
  })

  const {
    reset,
    formState: { isValid, isDirty },
  } = methods

  return (
    <ZionForm onSubmit={onSubmit} methods={methods}>
      <ValueTablesForExamplesOnly>
        <Grid gutters="md">
          <Cell columns={atWidth({ sm: 12, lg: 7 })}>
            <HeaderBlock
              heading="Purpose Statement Generator"
              size="md"
              overline="Zion Form Example"
              subHeading="Use the following form to generate a custom purpose statement."
            />
            <Separator size="xs" />

            <Grid guttersY="none">
              <FormTextField
                columns={atWidth({ sm: 6, md: 4, lg: 2 })}
                label="Adjective ending *ing"
                name="adjective1"
                placeholder="inspiring"
              />
              <FormTextField
                columns={atWidth({ sm: 6, md: 4, lg: 2 })}
                label="Plural Noun"
                name="pluralNoun1"
                placeholder="experiences"
              />
              <FormAutosuggest
                columns={atWidth({ sm: 6, md: 4, lg: 3 })}
                label="Emotion"
                name="emotion1"
                placeholder="joy"
                suggestions={emotionOptions}
                handleInput
                highlightMatchingText
              />
              <FormTextField
                columns={atWidth({ sm: 6, md: 4, lg: 3 })}
                label="Plural Noun"
                name="pluralNoun2"
                placeholder="people"
              />
              <FormTextField
                columns={atWidth({ sm: 6, md: 4, lg: 2 })}
                label="Verb"
                name="verb1"
                placeholder="discover"
              />
              <FormTextField
                columns={atWidth({ sm: 6, md: 4, lg: 2 })}
                label="Verb"
                name="verb2"
                placeholder="gather"
              />
              <FormTextField
                columns={atWidth({ sm: 6, md: 4, lg: 2 })}
                label="Verb"
                name="verb3"
                placeholder="connect"
              />
              <FormTextField
                columns={atWidth({ sm: 6, md: 4, lg: 3 })}
                label="Plural Noun"
                name="pluralNoun3"
                placeholder="families"
              />
              <FormTextField
                columns={atWidth({ sm: 6, md: 4, lg: 2 })}
                label="Time Period "
                name="timePeriod1"
                placeholder="future"
              />
              <Row>
                <Button type="submit" emphasis="high" disabled={!isValid}>
                  Submit
                </Button>
                <Button
                  type="reset"
                  onClick={() => {
                    reset()
                    setData(defaultValues)
                  }}
                  disabled={!isDirty}
                >
                  Reset
                </Button>
                <FormCheckbox label="Debug Form" name="debug" />
              </Row>
            </Grid>
          </Cell>
          <PurposeStatement columns={atWidth({ sm: 12, lg: 5 })} data={data} />
        </Grid>
        <Separator />
      </ValueTablesForExamplesOnly>
    </ZionForm>
  )
}

const PurposeStatement = ({
  data: { adjective1, pluralNoun1, emotion1, pluralNoun2, pluralNoun3, verb1, verb2, verb3, timePeriod1 },
}) => {
  const purposeStatement = `We create ${adjective1} ${pluralNoun1} that bring ${emotion1.primaryText} to all ${pluralNoun2} as they ${verb1}, ${verb2} and ${verb3} their ${pluralNoun3} — past, present and ${timePeriod1}.`

  return (
    <Card billboard outlined backgroundColor={colors.gray02}>
      <Separator growY />
      <HeaderBlock centered size="md" heading={purposeStatement} />
      <Separator growY />
    </Card>
  )
}

// Use React.memo() to keep our component from re-rendering if the props haven't changed
// https://reactjs.org/docs/react-api.html#reactmemo
// https://egghead.io/lessons/react-prevent-unnecessary-component-rerenders-with-react-memo
export default React.memo(PurposeStatementGenerator)
