export const FilePlace = {
  VILLAGE_PICTURE: 'village-picture',
  COURSE_PICTURE: 'course-picture',
  SUBMODULE_PICTURE: 'submodule-picture',
};

export type FilePlace = (typeof FilePlace)[keyof typeof FilePlace];
