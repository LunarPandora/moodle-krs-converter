import { computed } from 'vue'

export function useStatistics(completedFiles) {
  const statistics = computed(() => {
    let totalStudents = 0
    let totalCourses = 0

    completedFiles.value.forEach((file) => {
      const uniqueStudents = new Set(file.records.map((r) => r.NIM))

      totalStudents += uniqueStudents.size
      totalCourses += file.records.length
    })

    return {
      files: completedFiles.value.length,
      students: totalStudents,
      courses: totalCourses,
    }
  })

  return {
    statistics,
  }
}
