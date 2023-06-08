export const FilePlace = {
  VILLAGE_PICTURE: 'village-picture',
  COURSE_PICTURE: 'course-picture',
  SUBMODULE_PICTURE: 'submodule-picture',
  USER_PICTURE: 'user-picture',
};

export type FilePlace = (typeof FilePlace)[keyof typeof FilePlace];
