/*
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

import { get } from 'lodash'
import moment from 'moment'

export default class Article {
  constructor(props) {
    this.id = get(props, 'id', 0)
    this.title = get(props, 'title', '')
    this.type = get(props, 'type', 0)
    this.site_id = get(props, 'site_id', 0)
    this.auth_id = get(props, 'auth_id', 0)
    this.origin_url = get(props, 'origin_url', '')
    this.origin_url_md5 = get(props, 'origin_url_md5', '')
    this.youtube_url = get(props, 'youtube_url', '')
    this.youtube_id = get(props, 'youtube_id', '')
    this.image_path = get(props, 'image_path', '')
    this.description = get(props, 'description', '')
    this.short_description = get(props, 'short_description', '')
    this.text_only = get(props, 'text_only', '')
    this.ai_score = get(props, 'ai_score', 0)
    this.ai_info = get(props, 'ai_info', '')
    this.youtube_views = get(props, 'youtube_views', 0)
    this.views = get(props, 'views', 0)
    this.status = get(props, 'status', 1)
    this.admin_note = get(props, 'admin_note', '')
    this.hash_md5 = get(props, 'hash_md5', '')
    this.article_category_id = get(props, 'article_category_id', '')
    this.public_start_at = get(props, 'public_start_at', moment().unix())
    this.public_end_at = get(props, 'public_end_at', 0)
    this.create_origin_at = get(props, 'create_origin_at', 0)
    this.update_origin_at = get(props, 'update_origin_at', 0)
    this.last_crawl_at = get(props, 'last_crawl_at', 0)
    this.upload_files = get(props, 'upload_files', [])
    this.images = get(props, 'images', [])

    this.created_at = get(props, 'created_at', null)
    this.updated_at = get(props, 'updated_at', null)

    // action
    this.createAction = 'createArticle'
    this.detailAction = 'getArticle'
    this.updateAction = 'updateArticle'
  }

  /**
   * Get form data
   */
  getFormData() {
    const formData = {
      id: this.id,
      title: this.title,
      origin_url: this.origin_url ? this.origin_url : '',
      youtube_id: this.youtube_id ? this.youtube_id : '',
      youtube_url: this.youtube_url ? this.youtube_url : '',
      article_category_id: this.article_category_id,
      public_start_at: this.public_start_at ? this.public_start_at : moment().unix(),
      public_end_at: this.public_end_at ? this.public_end_at : 0,
      site_id: this.site_id,
      type: this.type,
      status: this.status,
      views: this.views,
      admin_note: this.admin_note ? this.admin_note : '',
      short_description: this.short_description === '' ? '</p></p>' : this.short_description,
      description: this.description,
      upload_files: this.upload_files,
      images: this.images,
      image_path: this.image_path ? this.image_path : ''
    }

    if (formData.public_start_at) {
      formData.public_start_at = Math.floor(formData.public_start_at / 1000)
    }

    if (formData.public_end_at) {
      formData.public_end_at = Math.floor(formData.public_end_at / 1000)
    }

    return formData
  }
}
