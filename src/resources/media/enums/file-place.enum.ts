export const FilePlace = {
  VILLAGE_PICTURE: 'village-picture',
  COURSE_PICTURE: 'course-picture',
};

export type FilePlace = (typeof FilePlace)[keyof typeof FilePlace];
