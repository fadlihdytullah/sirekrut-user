// @flow
const BASE_URL = 'https://us-central1-si-rekrut.cloudfunctions.net/api'
export const POSITIONS_API = {
  getAll: `${BASE_URL}/positions`,
  getSingle: (id: string) => `${BASE_URL}/positions/${id}`,
}

export const TIMELINES_API = {
  getAll: `${BASE_URL}/timelines`,
  getSingle: (id: string) => `${BASE_URL}/timelines/${id}`,
}

const AUTH_TOKEN =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc0Mzg3ZGUyMDUxMWNkNDgzYTIwZDIyOGQ5OTI4ZTU0YjNlZTBlMDgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2ktcmVrcnV0IiwiYXVkIjoic2ktcmVrcnV0IiwiYXV0aF90aW1lIjoxNTkxMTAxMDM3LCJ1c2VyX2lkIjoidlRPdFBDdjY1MVN2Uk1oVnlYTUNkMVFNUEdzMiIsInN1YiI6InZUT3RQQ3Y2NTFTdlJNaFZ5WE1DZDFRTVBHczIiLCJpYXQiOjE1OTExMDEwMzcsImV4cCI6MTU5MTEwNDYzNywiZW1haWwiOiJmYWRsaUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiZmFkbGlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.fCQh09zggm6gkHeaNcDDoNPEkM5evNtu_DeoAUctEDRhSkZICbP1I_DhBiep5UBbLv_le9BWvF0kbdZbyTGQ7re7yVptnIPTbBwtgvh3vUj08fWo7tP9Y-lLbdwSpXM3sUHTnkfW4u595Cm_w9zjAj1lXYBdjvUlQtFMfjvaCoYclHkiWx_kcpHjHR6e8uGpABe5H9_zbQN2glb4mDqn6Ddesm9b8kn4kw_rzIwxHNEONzov-AoQXKZRtVNxEPAqOBswYelUkubnxVaHjYSK9t6gcx9BnFnjLJEQVaMeUMrkYVbzt3mxalZKFvHe1pFDPihJIGQ7mMYWJGmEsJVDcg'

export const config = {
  headerConfig: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
  app: {
    strataOptions: [
      {
        key: 'D3',
        label: 'Diploma',
        value: 'DIPLOMA',
      },
      {
        key: 'S1',
        label: 'Sarjana',
        value: 'SARJANA',
      },
      {
        key: 'S2',
        label: 'Magister',
        value: 'MAGISTER',
      },
      {
        key: 'S3',
        label: 'Doktor',
        value: 'DOKTOR',
      },
    ],
  },
}
