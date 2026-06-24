export function useKrsParser() {
  function parseHtml(htmlText) {
    const parser = new DOMParser()

    return parser.parseFromString(htmlText, 'text/html')
  }

  function getTables(document) {
    return Array.from(document.querySelectorAll('table'))
  }

  function splitName(fullName) {
    const parts = fullName.trim().split(/\s+/)

    const lastname =
      parts.pop() || ''

    const firstname =
      parts.join(' ')

    return {
      firstname,
      lastname,
    }
  }

  function extractRecords(tables, tahunAkademik, semester) {
    const records = []
    let jumlahMahasiswa = 0

    for (let i = 0; i < tables.length; i += 4) {
      if (i + 2 >= tables.length) break
      jumlahMahasiswa++

      const infoTable = tables[i]
      const coursesTable = tables[i + 2]

      try {
        const infoRows = infoTable.querySelectorAll('tr')
        const courseRows = coursesTable.querySelectorAll('tr')
        const nama = infoRows?.[0]?.children?.[1]?.textContent?.trim()?.replace(':', '')
        const nim = infoRows?.[1]?.children?.[1]?.textContent?.trim()?.replace(':', '')

        courseRows.forEach((row) => {
          const cols = row.querySelectorAll('td')

          if (cols.length < 4) return

          const kodeMk = cols[1]?.textContent?.trim()
          const mataKuliah = cols[2]?.textContent?.trim()
          const sks = cols[3]?.textContent?.trim()

          if (!kodeMk || kodeMk === 'KODE MK') {
            return
          }

          const {
            firstname,
            lastname,
          } = splitName(nama)

          const username =
            `${firstname.replace(/\s+/g, '')}.${lastname}`
              .toLowerCase()

          const email =
            `${username}@calvin.ac.id`

          const course1 =
            `${kodeMk}-${tahunAkademik}-${semester}`

          records.push({
            username: email,
            email,
            firstname,
            lastname,
            idnumber: nim,
            course1,
            role1: 'student',
          })
        })
      } catch (error) {
        console.error(error)
      }
    }

    return {
      records,
      jumlahMahasiswa,
      jumlahMataKuliah: records.length,
    }
  }

  return {
    parseHtml,
    getTables,
    extractRecords,
  }
}
