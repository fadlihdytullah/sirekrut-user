import React, { Fragment } from 'react'
import { Typography, Input, Radio, Avatar, Button, message, Upload, Select } from 'antd'
import { useLocation } from 'react-router-dom'
import { UserOutlined, UploadOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import firebase from 'firebase'

import { SUBMISSIONS_API, FORM_CONF_API, config, auth } from '../config'

import axios from 'axios'
const styles = {
  labelContainer: {
    width: '150px',
  },
  fullWidth: {
    width: '100%',
  },
}

const { Option } = Select
const FormElement = props => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    }}
  >
    {props.children}
  </div>
)

const initFormData = () => ({
  fullName: '',
  email: '',
  address: '',
  originFrom: '',
  dateOfBirth: '',
  gender: '',
  phoneNumber: '',
  lastEducation: '',
  toeflScore: 0,
  toeflFile: null,
  _360Score: 0,
  _360File: null,
  cvFile: null,
  profilePicture: '',
  score: {
    academicScore: 0,
    psikotesScore: 0,
    interviewScore: 0,
  },
  passed: false,
  positionId: '',
  periodId: '',
})

const showFormInit = () => ({
  showToefl: false,
  show360: false,
})

function Submission(props) {
  const [formData, setFormData] = React.useState(initFormData())
  const [showForm, setShowForm] = React.useState(showFormInit())
  const [previewImage, setPreviewImage] = React.useState(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const location = useLocation()
  const history = useHistory()
  const { data } = location.state

  const handleChangeInput = (event: SyntheticInputEvent<>) => {
    const name = event.target && event.target.name
    const value = event.target && event.target.value

    setFormData(state => ({
      ...state,
      [name]: value,
    }))
  }
  const inputHandlerFile = (e, fileTypeName) => {
    const fileData = e.file.originFileObj
    firebase
      .storage()
      .ref(`${fileTypeName}/${fileData.uid}-${fileData.name}`)
      .put(fileData)
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
        setFormData(state => ({
          ...state,
          [fileTypeName]: url,
        }))
      })
      .catch(error => {
        console.log(error, 'this error from submission')
      })
  }

  const inputHandlerPicture = e => {
    console.log(e.file.originFileObj, 'asdsad')
    const fileData = e.file.originFileObj
    uploadFilePicture(fileData)
    setPreviewImage(URL.createObjectURL(e.file.originFileObj))
    // if (e.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {
    //   if (e.target.files[0].size > 2097152) {
    //     message('Upps, your file is too big, maximum filesize 2 Mb')
    //   } else {
    //     setPreviewImage(URL.createObjectURL(e.target.files[0]))
    //     setFormData(state => ({
    //       ...state,
    //       profilePicture: e.target.files[0],
    //     }))
    //   }
    // } else {
    //   message('Upps, only file jpg, jpeg, png, and gif allowed')
    // }
  }

  const uploadFilePicture = async file => {
    firebase
      .storage()
      .ref(`userPic/${file.uid}-${file.name}`)
      .put(file)
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
        setFormData(state => ({
          ...state,
          profilePicture: url,
        }))
      })
      .catch(error => {
        console.log(error, 'this error from submission')
      })
  }

  const handleSubmit = async isEdit => {
    console.log(formData, 'INI DATA')
    try {
      setIsSubmitting(true)

      const URL = SUBMISSIONS_API.post
      const method = 'post'

      const response = await axios[method](URL, formData, {
        headers: config.headerConfig,
      })

      const result = response.data
      console.log(result, 'ASIAAPPpp')
      if (isSubmitting) {
        message.loading('Loading', 0)
      }
      if (result.success) {
        history.push('/success')
        // handleFetchStudyPrograms();
        // setShowModal(false);
      } else {
        throw new Error(result.errors)
      }
    } catch (error) {
      if (error.response) {
        setIsSubmitting(false)
        message.error(error.response.data.errors)
      } else {
        message.error(error.message)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFetchFormConfig = async () => {
    try {
      const response = await axios.get(FORM_CONF_API.getConfig)
      const result = response.data
      console.log(result, 'AWW')
      if (result.success) {
        setShowForm(state => ({
          ...state,
          ...result.data,
        }))
      } else {
        throw new Error(result.errors)
      }
    } catch (error) {
      message.error(error.message)
    }
  }

  React.useEffect(() => {
    handleFetchFormConfig()
    setFormData(state => ({
      ...state,
      positionId: location.state.data.positionID,
      periodId: location.state.data.periodID,
    }))
  }, [])
  return (
    <Fragment>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography.Title level={2} style={{ marginBottom: 0 }}>
          Formulir Administrasi
        </Typography.Title>
        <Button type='primary' onClick={handleSubmit} disabled={isSubmitting}>
          Kirim Lamaran
        </Button>
      </div>

      <div>
        <div>
          <Typography.Text strong>Nama Periode: </Typography.Text>
          <Typography.Text>{(data && data.periodName) || ''}</Typography.Text>
        </div>
        <div>
          <Typography.Text strong>Nama Posisi: </Typography.Text>
          <Typography.Text>{(data && data.positionName) || ''}</Typography.Text>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, marginTop: 16 }}>
        <div style={{ width: '600px' }}>
          <FormElement>
            <div style={styles.labelContainer}>
              <Typography.Text>Nama Lengkap</Typography.Text>
            </div>
            <div style={{ display: 'flex', flex: 1 }}>
              <Input
                style={styles.fullWidth}
                name='fullName'
                placeholder={''}
                value={formData.fullName}
                allowClear={true}
                onChange={handleChangeInput}
              />
            </div>
          </FormElement>

          <FormElement>
            <div style={styles.labelContainer}>
              <Typography.Text>Email</Typography.Text>
            </div>
            <div style={{ display: 'flex', flex: 1 }}>
              <Input
                style={styles.fullWidth}
                name='email'
                placeholder={''}
                value={formData.email}
                allowClear={true}
                onChange={handleChangeInput}
              />
            </div>
          </FormElement>

          <FormElement>
            <div style={styles.labelContainer}>
              <Typography.Text>Alamat</Typography.Text>
            </div>
            <div style={{ display: 'flex', flex: 1 }}>
              <Input
                style={styles.fullWidth}
                name='address'
                placeholder={''}
                value={formData.address}
                allowClear={true}
                onChange={handleChangeInput}
              />
            </div>
          </FormElement>

          <FormElement>
            <div style={styles.labelContainer}>
              <Typography.Text>Asal</Typography.Text>
            </div>
            <div style={{ display: 'flex', flex: 1 }}>
              <Input
                style={styles.fullWidth}
                name='originFrom'
                placeholder={''}
                value={formData.originFrom}
                allowClear={true}
                onChange={handleChangeInput}
              />
            </div>
          </FormElement>

          <FormElement>
            <div style={styles.labelContainer}>
              <Typography.Text>Tanggal Lahir</Typography.Text>
            </div>
            <div style={{ display: 'flex', flex: 1 }}>
              <Input
                style={styles.fullWidth}
                name='dateOfBirth'
                placeholder={''}
                value={formData.dateOfBirth}
                allowClear={true}
                onChange={handleChangeInput}
              />
            </div>
          </FormElement>

          <FormElement>
            <div style={styles.labelContainer}>
              <Typography.Text>Jenis Kelamin</Typography.Text>
            </div>
            <div style={{ display: 'flex', flex: 1 }} flexJustifyContent='flex-start'>
              <Radio.Group name='gender' onChange={handleChangeInput}>
                <Radio value={'Laki-laki'}>Laki-laki</Radio>
                <Radio value={'Perempuan'}>Perempuan</Radio>
              </Radio.Group>
            </div>
          </FormElement>

          <FormElement>
            <div style={styles.labelContainer}>
              <Typography.Text>Telepon</Typography.Text>
            </div>
            <div style={{ display: 'flex', flex: 1 }}>
              <Input
                style={styles.fullWidth}
                name='phoneNumber'
                placeholder={''}
                value={formData.phoneNumber}
                allowClear={true}
                onChange={handleChangeInput}
              />
            </div>
          </FormElement>

          <FormElement>
            <div style={styles.labelContainer}>
              <Typography.Text>Pendidikan Terakhir</Typography.Text>
            </div>
            <div style={{ display: 'flex', flex: 1 }}>
              <Select
                style={styles.fullWidth}
                placeholder='Pilih pendidikan terakhir'
                onChange={value => {
                  setFormData(state => ({
                    ...state,
                    lastEducation: value,
                  }))
                }}
                name='lastEducation'
              >
                {config.app.strataOptions.map(data => (
                  <Option value={data.value} key={data.key}>
                    {data.label}
                  </Option>
                ))}
              </Select>
              {/* <Input
                style={styles.fullWidth}
                name='lastEducation'
                placeholder={''}
                value={formData.lastEducation}
                allowClear={true}
                onChange={handleChangeInput}
              /> */}
            </div>
          </FormElement>

          {showForm.showToefl && (
            <>
              {' '}
              <FormElement>
                <div style={styles.labelContainer}>
                  <Typography.Text>Nilai TOEFL</Typography.Text>
                </div>
                <div style={{ display: 'flex', flex: 1 }}>
                  <Input
                    style={styles.fullWidth}
                    name='toeflScore'
                    placeholder={''}
                    value={formData.toeflScore}
                    allowClear={true}
                    onChange={handleChangeInput}
                  />
                </div>
              </FormElement>
              <FormElement>
                <div style={styles.labelContainer}>
                  <Typography.Text>Bukti TOEFL</Typography.Text>
                </div>
                <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                  <div>
                    <Upload accept='.pdf' name='toeflFile' onChange={e => inputHandlerFile(e, 'toeflFile')}>
                      <Button>Upload</Button>
                    </Upload>
                  </div>
                  <Typography.Text type='danger'>* Hanya menerima sertifikat TOEFL/IELTS Telkom</Typography.Text>
                </div>
              </FormElement>
            </>
          )}

          {showForm.show360 && (
            <>
              <FormElement>
                <div style={styles.labelContainer}>
                  <Typography.Text>Nilai Tes 360</Typography.Text>
                </div>
                <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                  <Input
                    style={styles.fullWidth}
                    name='_360Score'
                    value={formData._360Score}
                    allowClear={true}
                    onChange={handleChangeInput}
                  />
                  <Typography.Text type='danger'>* Jika ada</Typography.Text>
                </div>
              </FormElement>

              <FormElement>
                <div style={styles.labelContainer}>
                  <Typography.Text>Bukti Tes 360</Typography.Text>
                </div>
                <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                  <div>
                    <Upload accept='.pdf' name='_360File' onChange={e => inputHandlerFile(e, '_360File')}>
                      <Button>Upload</Button>
                    </Upload>
                  </div>
                  <Typography.Text type='danger'>* Jika ada</Typography.Text>
                </div>
              </FormElement>
            </>
          )}
        </div>
        <div style={{ marginLeft: 24, width: '150px' }}>
          <div style={{ width: '150' }}>
            <Avatar icon={<UserOutlined />} src={previewImage ? previewImage : null} shape='square' size={150} />
            <div style={{ marginTop: 8 }}>
              <Upload name='picture' accept='image/*' onChange={inputHandlerPicture}>
                <Button>
                  <UploadOutlined /> Upload Foto
                </Button>
              </Upload>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <Typography.Text>Dokumen Lainnya</Typography.Text>
            <Upload accept='.pdf' name='picture' onChange={e => inputHandlerFile(e, 'cvFile')}>
              <Button>Upload CV</Button>
            </Upload>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Submission
